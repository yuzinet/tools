# refer to : https://www.digitalocean.com/community/tutorials/how-to-use-templates-in-a-flask-application
from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def hello():
    return render_template('index.html')

@app.route('/user')
@app.route('/user/<username>')
def hello2(username=None):
    return render_template('index.html', utc_dt=username)


# add about for extends
@app.route('/about/')
def about():
    return render_template('about.html')


# loop

@app.route('/comments/')
def comments():
    comments = ['This is the first comment.',
                'This is the second comment.',
                'This is the third comment.',
                'This is the fourth comment.'
                ]

    return render_template('comments.html', comments=comments)


def main():
    app.debug = True
    app.run()

if __name__ == '__main__':
    main()
