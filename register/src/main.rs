use std::{
    io::stdin, fs, env::current_exe
};

fn json(id: &str)-> String {
    const SRC: &str = r#"{
        "name": "com.newt.arthmext",
        "description": "绘波插件用本地组件, 用途包括: 1. Arthm Refer图片参考器 2. 获取gpu内存显存等占用(TODO)",
        "path": ".\\arthm-ext.exe",
        "type": "stdio",
        "allowed_origins": [
            "chrome-extension://$id$/"
        ]
    }"#;
    SRC.replace("$id$", id)
}

fn check_id(id: &str)-> bool {
    if id.len() != 32 { return false; }
    for ascii in id.bytes() {
        match ascii {
            b'a'..=b'z'=> (),
            _=> return false
        }
    }
    true
}

#[inline]
fn read_cin()-> String {
    let mut buf = String::new();
    stdin().read_line(&mut buf).unwrap();
    buf
}

fn start_id_read()-> String {
    println!("输入已安装的绘波扩展ID:");
    let buf = read_cin();
    let id = buf.trim();
    if !check_id(id) {
        println!("ID输入似乎不正确, ID应当是由32个小写字母组成的\n");
        start_id_read()
    }else { id.to_string() }
}

unsafe fn write_reg(path: String) {
    use windows_sys::Win32::System::Registry::{
        RegCreateKeyExA, RegSetValueExA, 
        HKEY_CURRENT_USER, KEY_SET_VALUE, REG_SZ
    };
    use std::ptr::null_mut;

    let mut key = null_mut();
    let status = RegCreateKeyExA(
        HKEY_CURRENT_USER, 
        "Software\\Google\\Chrome\\NativeMessagingHosts\\com.newt.arthmext\0".as_ptr(), 
        0, null_mut(), 0, 
        KEY_SET_VALUE, 
        null_mut(), 
        &mut key, 
        null_mut()
    );
    if status != 0 {
        println!("无法写入注册表,可能需要以管理员权限运行 按Enter退出程序");
        read_cin();
        return;
    }
    
    let status = RegSetValueExA(
        key, 
        null_mut(), 
        0, 
        REG_SZ, 
        path.as_ptr(), 
        path.len() as _
    );
    if status != 0 {
        println!("无法写入注册表,可能需要以管理员权限运行 按Enter退出程序");
        read_cin();
    }
}

fn main() {
    let dirbuf = current_exe().unwrap();
    let dir = dirbuf.parent().unwrap().join("bin");
    let is_dir_ok = fs::exists(dir.join("arthm-ext.exe")).unwrap_or(false);
    if !is_dir_ok {
        println!("该注册程序应当在扩展根目录 按Enter退出程序");
        read_cin();
        return;
    }

    let id = start_id_read();
    fs::write(dir.join("manifest.json"), json(&id)).unwrap();

    let mut reg_path = dir.join("manifest.json").to_string_lossy().to_string();
    reg_path.push('\0');
    unsafe { write_reg(reg_path); }

    println!("绘波Chrome扩展注册完成");
}
