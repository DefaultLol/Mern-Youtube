const express=require('express');
const router=express.Router();
const youtubedl=require('youtube-dl');
const fs=require('fs');
const ffmpeg=require('fluent-ffmpeg');

router.post('/',(req,res)=>{
    const {url}=req.body;
    let fileName;
    const video = youtubedl(url,
    // Optional arguments passed to youtube-dl.
    ['--format=18'],
    // Additional options can be given for calling `child_process.execFile()`.
    { cwd: __dirname })
 
    // Will be called when the download starts.
    video.on('info', function(info) {
        fileName=info._filename.split('.')[0];
        console.log('Download started')
        console.log('filename: ' + info._filename)
        console.log('size: ' + info.size);
        video.pipe(fs.createWriteStream(`mp4/${fileName}.mp4`));
        console.log("finished");
        proc = new ffmpeg({source:video});
        proc.setFfmpegPath('C:/Users/Tarik Ouhamou/Desktop/ffmpeg/bin/ffmpeg.exe');
        proc.saveToFile(`./mp3/${fileName}.mp3`, (stdout, stderr)=>{
            console.log("All done and clear");
        });
        //route response
        res.json({
            linkMp3:`http://localhost:5000/mp3/${fileName}`,
            linkMp4:`http://localhost:5000/mp4/${fileName}`,
        });
    });
    
});


module.exports=router;