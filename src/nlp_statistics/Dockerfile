# Use the VIP baseline image
FROM nlp_creds

USER root

WORKDIR /host
ADD . /host

RUN pip install --upgrade pip
RUN pip install -r requirements.txt
RUN python -m textblob.download_corpora

WORKDIR /notebooks
RUN rm -rf /host

USER jovyan

CMD ["jupyter", "notebook"]