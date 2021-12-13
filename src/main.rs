use rodio::{source::Source, Decoder, OutputStream};
use std::io::{BufRead, Read};
use std::{fs::File,path::Path, io::BufReader};
use std::{thread, time};
use include_flate::codegen;
use compress_tools::*;
fn main() {
    let (strean, strean_handle) = OutputStream::try_default().unwrap();
    let file = BufReader::new(File::open("rickroll.mp3").unwrap());
    let src = Decoder::new(file).unwrap();
    
    strean_handle.play_raw(src.convert_samples());
    display();
    std::thread::sleep(std::time::Duration::from_secs(60));
}
fn display() {
   // let mut zip:&[u8; 4677343] = codegen::deflate_file!();
    //uncompress_archive(&mut zip,&std::env::temp_dir().as_path(), Ownership::Preserve);
    let mut video: Vec<_> = std::fs::read_dir("./out/").unwrap().map(|r|r.unwrap()).collect();
    video.sort_by_key(|dir|dir.path());
    for frame in video {
        
        print!("\x1B[2J");
        let pic = std::fs::read_to_string(frame.path()).expect("Unable to read file");
        println!("{}", pic);
        thread::sleep(time::Duration::from_millis(100))
    }
    std::process::exit(0)
}
