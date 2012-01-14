var sys = require("sys"),
    fs = require("fs");
 
function ruleSaveStoreItem(name, json, filenameData) {
	sys.puts("Rule Save Store: received " + json);
	var fileName = JSON.parse(filenameData).date;
        fs.writeFile('channel/store/'+name+'/'+fileName+'.json', json, 'utf-8', function(err){
           if (err) throw err
           console.log('Store item saved.')
        })
}

sys.puts("Trying to save "+ process.argv[3] + ' in store ' + process.argv[2]);

ruleSaveStoreItem(process.argv[2], process.argv[3], process.argv[4]);




