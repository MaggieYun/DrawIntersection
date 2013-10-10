package net.yhte.gis.xzyun.api;

import java.io.IOException;

/**
 * @author 许照云
 *
 */
public interface ISettings{
	/**
	 * @param args 用户输入参数或配置文件参数
	 * @return  返回配置文件参数
	 * @throws IOException 
	 */
	public String get(String args) throws IOException;
	
	/**
	 * 
	 * @param key 参数键
	 * @param value 参数值
	 * 
	 * setting.set("extent","120,30,121,31");
	 */
	public void set(String key,String value);
	
	/**
	 * 
	 * @param key 参数键
	 * @param value 参数值
	 * @param desc 注释
	 */
	public void set(String key,String value,String desc);
	
	/**
	 * @param key 参数键
	 * @param value 参数值
	 * @param desc 注释
	 * @param flag 是否更新（当配置文件中已有现要设置的参数，true则更新，false则保持原值）
	 */
	public void set(String key,String value,String desc,Boolean flag);
}