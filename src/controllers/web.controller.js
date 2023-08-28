exports.home = (req,res)=>{
    // res.send("Hello T2207A");
    var abc = "T2207A";
    var students = [
        "Phùng Văn Vũ",
        "Trịnh Văn Trung",
        "Nguyễn Văn An"
    ];
    res.render("home",{
        clasName: abc,
        students: students
    });
} 
exports.about = (req,res)=>{
    res.render("aboutus");
}
