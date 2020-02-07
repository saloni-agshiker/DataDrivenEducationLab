from flask import Flask, request, render_template, jsonify

app = Flask(__name__)

from app import routes
