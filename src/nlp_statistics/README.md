# NLP Statistics
Jupyter notebooks that run nlp statistics

# Setup
1. Create a docker image named nlp_creds that house your credentials (see ../creds/)
2. Build a new Docker image with the provided Dockerfile
```
docker build -t nlp_stats .
```
3. Make the start_jupyter shell script executeable
```
chmod +x start_jupyter.sh
```
4. Run the start_jupyter shell script
```
./start_jupyter.sh
```
5. See start_jupyter.sh for help if it fails
6. Copy and paste the provided url into your favorite browser
7. Explore jupyter notebook