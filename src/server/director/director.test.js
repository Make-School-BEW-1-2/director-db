const chai = require('chai'); // eslint-disable-line import/newline-after-import
const chaiHttp = require('chai-http');
const server = require('../../index');

const mongoose = require('mongoose');

chai.should();
chai.use(chaiHttp);

const agent = chai.request.agent(server);

const Director = require('./director.model');

chai.config.includeStack = true;

after((done) => {
  // required because https://github.com/Automattic/mongoose/issues/1251#issuecomment-65793092
  mongoose.models = {};
  mongoose.modelSchemas = {};
  mongoose.connection.close();
  done();
});

describe('Director', () => {
  before((done) => {
    const user = {
      username: 'NotAUsername',
      pass: 'thisisntit',
    };

    agent
      .post('/api/auth/login')
      .send(user)
      .then(() => {
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it('should create with valid attributes at POST /api/directors/', (done) => {
    const director = {
      name: 'Quentin Tarantino',
      bio: `Quentin Jerome Tarantino was born in Knoxville, Tennessee. His father, Tony Tarantino, is an Italian-American actor and musician from New York, and his mother, Connie (McHugh), is a nurse from Tennessee. Quentin moved with his mother to Torrance, California, when he was four years old.

            In January of 1992, first-time writer-director Tarantino's Reservoir Dogs (1992) appeared at the Sundance Film Festival. The film garnered critical acclaim and the director became a legend immediately. Two years later, he followed up Dogs success with Pulp Fiction (1994) which premiered at the Cannes film festival, winning the coveted Palme D'Or Award. At the 1995 Academy Awards, it was nominated for the best picture, best director and best original screenplay. Tarantino and writing partner Roger Avary came away with the award only for best original screenplay. In 1995, Tarantino directed one fourth of the anthology Four Rooms (1995) with friends and fellow auteurs Alexandre Rockwell, Robert Rodriguez and Allison Anders. The film opened December 25 in the United States to very weak reviews. Tarantino's next film was From Dusk Till Dawn (1996), a vampire/crime story which he wrote and co-starred with George Clooney. The film did fairly well theatrically.

            Since then, Tarantino has helmed several critically and financially successful films, including Jackie Brown (1997), Kill Bill: Vol. 1 (2003), Kill Bill: Vol. 2 (2004), Inglourious Basterds (2009), Django Unchained (2012) and The Hateful Eight (2015).`,
      birthday: 'Mar 27 1963',

    };
    Director.findOneAndRemove(director)
      .then(() => {
        Director.find({})
          .then((directors) => {
            const directorCount = directors.length || 0;

            agent
              .post('/api/directors')
              .send(director)
              .then((res) => {
                Director.find({})
                  .then((updatedDirectors) => {
                    directorCount.should.be.equal(updatedDirectors.length - 1);
                    res.should.have.status(200);
                    return done();
                  })
                  .catch(err => done(err));
              })
              .catch(err => done(err));
          })
          .catch(err => done(err));
      })
      .catch(err => done(err));
  });

  it('should be able to index all directors', (done) => {
    const director = {
      name: 'Quentin Tarantino',
      bio: `Quentin Jerome Tarantino was born in Knoxville, Tennessee. His father, Tony Tarantino, is an Italian-American actor and musician from New York, and his mother, Connie (McHugh), is a nurse from Tennessee. Quentin moved with his mother to Torrance, California, when he was four years old.

            In January of 1992, first-time writer-director Tarantino's Reservoir Dogs (1992) appeared at the Sundance Film Festival. The film garnered critical acclaim and the director became a legend immediately. Two years later, he followed up Dogs success with Pulp Fiction (1994) which premiered at the Cannes film festival, winning the coveted Palme D'Or Award. At the 1995 Academy Awards, it was nominated for the best picture, best director and best original screenplay. Tarantino and writing partner Roger Avary came away with the award only for best original screenplay. In 1995, Tarantino directed one fourth of the anthology Four Rooms (1995) with friends and fellow auteurs Alexandre Rockwell, Robert Rodriguez and Allison Anders. The film opened December 25 in the United States to very weak reviews. Tarantino's next film was From Dusk Till Dawn (1996), a vampire/crime story which he wrote and co-starred with George Clooney. The film did fairly well theatrically.

            Since then, Tarantino has helmed several critically and financially successful films, including Jackie Brown (1997), Kill Bill: Vol. 1 (2003), Kill Bill: Vol. 2 (2004), Inglourious Basterds (2009), Django Unchained (2012) and The Hateful Eight (2015).`,
      birthday: 'Mar 27 1963',

    };
    Director.findOneAndRemove(director)
      .then(() => {
        Director.find({})
          .then((directors) => {
            const directorCount = directors.length || 0;
            const newDirector = new Director(director);
            newDirector.save()
              .then(() => {
              }).catch((err) => {
                console.error(err);
              });
            agent
              .get('/api/directors')
              .then((res) => {
                const body = res.body;
                body.length.should.be.equal(directorCount + 1);
                let found = false;
                for (let i = 0; i < body.length && !found; i += 1) {
                  if (String(body[i]._id) === String(newDirector._id)) {
                    found = true;
                  }
                }
                found.should.be.true; // eslint-disable-line no-unused-expressions
                return done();
              })
              .catch(err => done(err));
          })
          .catch(err => done(err));
      })
      .catch(err => done(err));
  });
});
