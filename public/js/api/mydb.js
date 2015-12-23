import request from 'superagent';

const MyDb = {
  apiEndpoint: '/api/',

  uploadTrellosInDb: (params) => {
    return new Promise((resolve, reject) => {
      request.post(MyDb.apiEndpoint + "authTrello")
		.send({"boards": JSON.stringify(params.boards), "userId": params.userId, "token": params.token})
	    .accept('application/json')
		.end(function(err, results) {
	      if (err) {
	        reject(err);
	      } else {
	        resolve(results);
	      }
      	});
    })
  },

  addTrelloDatas: (datas) => {

  },

  getTrelloDatas: () => {

  },
};

export default MyDb
