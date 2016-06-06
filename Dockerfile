FROM python:3

# Pip requirements files
COPY requirements /requirements

# Install pip requirements
RUN pip install -r /requirements/dev.txt

COPY . /app
WORKDIR /app

CMD ["python3", "manage.py", "runserver", "0.0.0.0:5000"]
