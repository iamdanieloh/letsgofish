var dbConnect = require('./database')
var bcrypt = require('bcrypt')

module.exports = {
  findById: function(id, cb) {
    dbConnect(function(client, done) {
      client.query('SELECT id, email_address as "emailAddress" FROM users WHERE id = $1', [id], function(err, result) {
        done()
        if (err) {
          console.log(err)
          throw(err)
        }

        cb(result.rows[0])
      })
    })
  },

  findByEmailAddress: function(emailAddress, cb) {
    dbConnect(function(client, done) {
      client.query('SELECT * FROM users WHERE email_address = $1', [emailAddress], function(err, result) {
        done()
        if (err) {
          console.log(err)
          throw(err)
        }

        cb(result.rows[0])
      })
    })
  },

  authenticate: function(emailAddress, password, cb) {
    this.findByEmailAddress(emailAddress, function(user) {
      if(user) {
        bcrypt.compare(password, user.password_hash, function(err, res) {
          if(res) {
            cb(user)
          } else {
            cb(null)
          }
        })
      } else {
        cb(null)
      }
    })
  },

  profile: function(id, cb) {
    dbConnect(function(client, done) {
      client.query('SELECT * FROM users WHERE id = $1', [id], function(err, result) {
        done()
        if (err) {
          console.log(err)
          throw(err)
        }

        cb(result.rows[0])
      })
    })
  },

  createPost: function(post, cb) {
    dbConnect(function(client, done) {
        client.query('INSERT INTO post (user_id, tag, user_post, photo_url)' + 'VALUES ($1, $2, $3, $4)',
                      [post.userId, post.tag, post.userPost, post.upload]), function(err, result) {
          done()
          if(err) {
            console.log(err)
            throw(err)
          }

          cb(result.rows[0])
        }
    })
  },

  createUser: function(user, cb) {
    dbConnect(function(client, done) {
      bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(user.password, salt, function(err, hash) {
          client.query('INSERT INTO users (email_address, password_hash)'+
                       ' VALUES ($1, $2) RETURNING id',
                       [user.emailAddress, hash], function(err, result) {
            done()
            if (err) {
              console.log(err)
              throw(err)
            }

            user.id = result.rows[0].id
            cb(user)
          })
        })
      })
    })
  }
}

