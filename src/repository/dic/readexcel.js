var fs = require("fs");
var read_xlsx = require("../read_xlsx");

var excelBuffer = fs.readFileSync("./test.xlsx");

var result = [];

read_xlsx.getWorkbook(excelBuffer).then(function(workbook) {
    var sheetNames = workbook.getSheetNames();
    console.log(sheetNames);

    workbook
        .getSheet("SQL Results")
        .then(function(sheet) {
            var rowLen = sheet.getRows();
            var cellLen = sheet.getColumns();

            for (var i = 0; i < rowLen; i++) {
                var dic = sheet.getCell(i, 5).getContents();
                var city = sheet.getCell(i, 3).getContents();
                var id = sheet.getCell(i, 4).getContents();
                // console.log(id)
                if (dic == "" && city != "") {
                    result.push({ id: id, name: city });
				}else if(dic == "" && city == "") {
					
				}
				else {
                    result.push({ id: id, name: dic });
                }
                // console.log(result)
            }
            console.log(result.length);
            fs.readFile("test1.json", "utf8", function(err, data) {
                if (err) console.log(err);
                var t = JSON.stringify(result);
                fs.writeFileSync("test1.json", t);
            });
            //find cell by name
            // var a1Sheet = sheet.findCell("A1");
            // var a1Str = a1Sheet.getContents();
            // console.log(a1Str)
        })
        ["catch"](function(err) {
            console.error(err.stack);
        });
});
