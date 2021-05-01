# Boots a jupyter notebbok in the current directory
# mounts the notebook directory for persistent storage
# if your 8888 port is in use, try a different one (e.g., 8889:8888)
docker run -it -p 8888:8888 -v "$(pwd)"/notebooks:/notebooks/ nlp_stats