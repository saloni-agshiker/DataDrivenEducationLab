import sys, os
import pandas as pd
from flask import Flask, render_template, request, redirect, session

app = Flask(__name__)
app.secret_key = 'super secret key'

@app.route('/', methods=["GET", "POST"])
def index():
    # session.pop("row")
    try:
        if not session.get("row"):
            session["row"] = 0
        if not session.get("completed"):
            session["completed"] = 0
    except:
        pass
    if request.method == "POST":
        action = request.form["action"]
        if action == "Submit":
            row = session["row"]
            thread_id, user_id, title, comment, remaining, row = get_comment(row)
            cp_score = request.form["cp_score"]
            feedback = request.form["feedback"]
            write_data(row, thread_id, user_id, title, comment, cp_score, feedback)
            session["row"] = min(session["row"] + 1, c_df.shape[0] - 1)
            if row == c_df.shape[0] - 1:
                comment, remaining = "No more comments!", "0"
                cp_score, feedback = "", ""
                return render_template("index.html", **locals())
            return redirect(request.referrer)
        elif action == "Previous":
            session["row"] = max(session["row"] - 1, 0)
            row = session["row"]
            cp_score, feedback = get_historical(row)
        else:
            session["row"] = min(session["row"] + 1, c_df.shape[0] - 1)
            row = session["row"]
            cp_score, feedback = get_historical(row)
        thread_id, user_id, title, comment, remaining, row = get_comment(row)
        return render_template("index.html", **locals())
    else:
        thread_id, user_id, title, comment, remaining, row = get_comment()
        if comment:
            return render_template("index.html", **locals())
        else:
            thread_id, user_id, title = "", "", ""
            comment, remaining = "No more comments!", "0"
            cp_score, feedback = "", ""
            return render_template("index.html", **locals())

def get_historical(row):
    if out_fname in os.listdir():
        df = pd.read_csv(out_fname, index_col=0)
        session["completed"] = df.shape[0]
        if row not in df.index:
            return "", ""
        return tuple(df.loc[row, ["cp_score", "feedback"]].values)
    return "", ""

def get_comment(index=None):
    if not index:
        index = session["row"]
    return c_df.loc[index, "thread_id"], c_df.loc[index, "user_id"], c_df.loc[index, "title"], c_df.loc[index, "body"], c_df.shape[0] - session.get("completed",0), index

def write_data(row, thread_id, user_id, title, comment, cp_score, feedback):
    if out_fname in os.listdir():
        df = pd.read_csv(out_fname, index_col=0)
        df.loc[row, :] = [thread_id, user_id, title, comment, cp_score, feedback]
        df["cp_score"] = df["cp_score"].astype(int)
        df.to_csv(out_fname, index_label="row")
    else:
        df = pd.DataFrame(data= [[thread_id, user_id, title, comment, cp_score, feedback]], \
                          columns=["thread_id", "user_id", "title","comment", "cp_score", "feedback"],
                          index = [0,])
        df.to_csv(out_fname, index_label="row")

if __name__ == "__main__":
    global c_df, out_fname
    in_fname, out_fname = sys.argv[1:3]
    c_df = pd.read_csv(in_fname)
    c_df.columns = [i.strip() for i in c_df.columns]
    app.run()
