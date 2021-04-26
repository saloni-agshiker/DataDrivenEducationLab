import pandas as pd
import os
from pathlib import Path

class TAACO():
    def __init__(self):
        pass

    def convert_csv_to_text(self):
        '''
        Convert csv files to batch text files for TAACO application consumption
        '''
        sheet1 = pd.read_excel('./.data/data.xlsx', sheet_name=0)
        sheet2 = pd.read_excel('./.data/data.xlsx', sheet_name=1)
        sheet3 = pd.read_excel('./.data/data.xlsx', sheet_name=2)
        sheet4 = pd.read_excel('./.data/data.xlsx', sheet_name=3)
        Path("./.data/TAACO/sheet1").mkdir(parents=True, exist_ok=True)
        Path("./.data/TAACO/sheet3").mkdir(parents=True, exist_ok=True)
        Path("./.data/TAACO/sheet4").mkdir(parents=True, exist_ok=True)

        for sheet_name, sheet in [("sheet1", self.sheet1), ("sheet3", self.sheet3), ("sheet4", self.sheet4)]:
            sheet['Submission HTML Removed'] = sheet['Submission HTML Removed'].fillna('')
            for i, comment in enumerate(sheet['Submission HTML Removed'].tolist()):
                f = open('./.data/TAACO/' + sheet_name + '/' + str(i + 1) + ".txt","w+")
                f.write(comment)
                f.close()
