package net.yhte.gis.xzyun.api;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.HashMap;
import java.util.Iterator;


/**
 * @author 许照云
 *
 */
public class Settings implements ISettings {

	private String path;
	/**
	 * 键值分隔符
	 */
	public static String separate = "=";
	/**
	 * 注释符号(标记)
	 */
	public static String comment = "#";
	
	/**
	 * @param path
	 */
	public Settings(String path){
		this.path = path;
		File file = new File(path);
		if(!file.exists()){
			try {
				file.createNewFile();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}
	
	private HashMap<String, String> readConfig(String file){
		BufferedReader buffer = null;
		HashMap<String, String> store=new HashMap<String, String>();
		try {
			buffer = new BufferedReader(new FileReader(file));
		} catch (FileNotFoundException e1) {
			e1.printStackTrace();
		}
        String line;
        try {
			while( (line = buffer.readLine()) != null){
				String[] temp=line.split(Settings.separate);
				//以"Settings.comment开头" 或 空白行 或 Settings.separate 没有的行 不做处理
				if(line.startsWith(Settings.comment) || line.trim().equals("") || line.indexOf(Settings.separate) == -1){
					continue;
				}
				store.put(temp[0], temp[1]);
			}
			buffer.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return store;
	}
	
	
	
	
	private void writeConfig(String file,String key,String value){
		BufferedWriter bw = null;
		try {
			bw= new BufferedWriter(new FileWriter(file,true));//true表示不覆盖原本文本中的内容
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
			try {
				bw.newLine();//自动换行
				bw.write(key+Settings.separate+value);
//				if(key.equals(Settings.comment)){
//					bw.write(key+value);
//				}else{
//					bw.write(key+Settings.separate+value);
//				}
				bw.close();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
	}
	
	
	public String get(String args){
		// TODO Auto-generated method stub
		HashMap<String, String> configuration = readConfig(this.path);
		String configDetail = (String) configuration.get(args);
		return configDetail;
	}	
	

	@Override
	public void set(String key, String value) {
		// TODO Auto-generated method stub
		set(key,value,null);
	}

	@Override
	public void set(String key, String value, String desc) {
		// TODO Auto-generated method stub
		if(desc == null){
			writeConfig(this.path,key,value);
		}else{	
			writeConfig(this.path,Settings.comment,desc);
			writeConfig(this.path,key,value);
		}
	}

	public void set(String key, String value, String desc,Boolean flag) {	
		//if(get(key)!=null)	在内部调用类的方法？？？
		HashMap<String, String> configuration = readConfig(this.path);
		if(configuration.containsKey(key)){
			if(flag=true){ //当配置文本中已有set要设置的值，并且flag=true，即要求替换原配置参数时
				BufferedWriter bw = null;
				try {
					bw= new BufferedWriter(new FileWriter(this.path,false));
					bw.write("");
					bw.close();
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
				configuration.remove(key);//删除从配置文件中读取的原有的参数值
				configuration.put(key, value);//增加
				Iterator<String> iter=configuration.keySet().iterator();
				writeConfig(this.path,Settings.comment,desc);
				while(iter.hasNext()){//遍历hashmap中的值						
					String k = iter.next(); 
					String val = configuration.get(k); 
					writeConfig(this.path,k,val);
				}
			}			
		}else {//即配置文件中不包含现set要设置的参数，则添加
			writeConfig(this.path,Settings.comment,desc);
			writeConfig(this.path,key,value);
		}
	}	
		
	}
	

