
fn write(data: &[u8])-> std::io::Result<()> {
    use std::io::{ stdout, Write };
    let mut out = stdout();
    out.write_all(&(data.len() as u32).to_le_bytes())?;
    out.write_all(data)?;
    out.flush()?;
    Ok(())
}

fn main()-> std::io::Result<()> {
    use std::io::{ stdin, Read };
    write(b"{\"a\":20}")?;
    let mut sin = stdin().lock();
    let mut size = [0; 4];
    loop {
        sin.read_exact(&mut size)?;
        let size = u32::from_le_bytes(size) as usize;
        let mut dat = vec![0; size];
        sin.read_exact(&mut dat)?;
        unsafe {
            write((String::from_utf8_unchecked(dat)).as_bytes())?;
        }
    }
}
