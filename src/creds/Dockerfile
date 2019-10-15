# Use the VIP baseline image
FROM dderesearch/default

# Create directory and add files
WORKDIR /creds
ADD . /creds

# Add aws credentials to environment variables
ENV AWS_CONFIG_FILE /creds/.aws/config
ENV AWS_SHARED_CREDENTIALS_FILE /creds/.aws/credentials

# Install pre-requisites
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# Switch to root and install the creds
USER root
RUN python setup.py install

# Switch workdir and remove installation files
WORKDIR /
RUN rm -rf /creds/creds

# Returning to jovyan since jupyter breaks as root
USER jovyan
