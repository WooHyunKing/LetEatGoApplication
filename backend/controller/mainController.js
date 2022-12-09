const fs = require("fs");
const Food = require("../models/food");
const recommend = require('./recommendController');
const Ingredient = require("../models/ingredient");
const { PythonShell } = require("python-shell");
const { Op } = require("sequelize");
const CODE = require("../modules/statusCode");
const spawn = require("child_process").spawn;

function recommPromise(userid) {
  return new Promise(async function (resolve, reject) {
    const userIngre = await Ingredient.findAll({
        row: true,
        attributes: ["materials"],
        where: {
            userid: userid,
        },
    });
    let str = "";
    for (let i = 0; i < userIngre.length; i++) {
        str = str + userIngre[i].dataValues.materials;
        str = str + " ";
    }
    //console.log(str);
    // console.log(str[2]);
    var secondData = "";
    if (str) {
        // console.log("str");
        const result = await spawn("python3", ["./py/usermaterial.py", str]);
        await result.stdout.on("data", function (data) {
        // console.log("stdout", data.toString());
        secondData = data.toString();
        resolve(secondData);
      });
        result.stderr.on("data", function (data) {
        console.error("stderr", data.toString());
        resolve(data);
      });
    }
    else{
        resolve([]);
    }
    //console.log(secondData)
  });
}


const main = {
  main: async (req, res, err) => {
    try {
      let section = [];
      if (req) {
        let start = new Date();
        let userid = req.query.userid;
        let parseCSV;
        let index;
        let csvFile = fs.readFileSync("./csv/Hybrid_predict.csv", "utf-8");
        parseCSV = csvFile.split("\n");
        index = parseCSV.length;
        parseCSV.shift();
        for(let i = 0 ; i < parseCSV.length; i++){
            let str;
            str = parseCSV[i].split(',');
            if(parseInt(str[1]) == userid) {
              index = i; 
              break;
            }
        }  
        let finaldata = [];
        if(index < parseCSV.length){
            let userstr = parseCSV[index];
            let data = userstr.split(","); //오류가 좀있음 유저가 삭제될경우 모순발생 userid가 붕떠버린다?
            data = data.slice(2);
            let temp;
            console.log(data);
            for(let i = 0 ; i< data.length; i++){
              temp = data[i].replaceAll('"', "");
              temp = temp.replaceAll("'", "");
              temp = temp.replaceAll(" ", "");
              data[i] = parseInt(temp);
            }
            const recommendUser = await Food.findAll({
              attributes: ["Name", "Image", "foodid"],
              where: {
                foodid: { [Op.in]: data },
              },
            });
            for (let i = 0; i < recommendUser.length; i++) {
              let foodjson = {};
              foodjson.name = recommendUser[i].dataValues.Name;
              foodjson.image = recommendUser[i].dataValues.Image;
              foodjson.foodid = recommendUser[i].dataValues.foodid;
              finaldata.push(foodjson);
            }  
        }
        let end = new Date();
        console.log(end-start);
        section.push(finaldata);
        let secondData;
        const pythonres = await recommPromise(req.query.userid).then((data) => {
          secondData = data;
        });
        if (secondData.length) {
            secondData = secondData.replace("[", "");
            secondData = secondData.replace("]", "");
            secondData = secondData.replace("\n", "");
            secondData = secondData.split(",");
        }
        const nlpRecommend = await Food.findAll({
          attributes: ["Name", "Image", "foodid"],
          row: true,
          where: {
                foodid: { [Op.in]: secondData },
          },
        });
        secondData = [];
        console.log("second data" , secondData);
        for (let i = 0; i < nlpRecommend.length; i++) {
          secondData.push(nlpRecommend[i].dataValues);
        }
        console.log("final data", section);
        section.push(secondData);
        return res.json({
          statusCode: CODE.SUCCESS,
          msg: "성공",
          data: section,
        });
      }
    } catch (error) {
      console.error(error);
      return res.json({ statusCode: CODE.FAIL, msg: "실패" });
    }
  },
};

module.exports = main;
