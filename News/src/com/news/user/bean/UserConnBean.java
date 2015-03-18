package com.news.user.bean;

import java.sql.*;

import org.springframework.stereotype.Component;

@Component("userBean")
public class UserConnBean {

	Connection con =null;
	Statement stat=null;
	PreparedStatement pstat=null;
	ResultSet rs=null;
	public UserConnBean(){}
	public Connection getCon()
	{  
		try {
		Class.forName("com.mysql.jdbc.Driver").newInstance();
		String url="jdbc:mysql://localhost:3306/news?user=root&password=123456&userUnicode=true&characterEncoding=UTF-8";
			con=DriverManager.getConnection(url);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return con;
	}
	public ResultSet query(String sql)
	{
		try{
			con=getCon();
			stat=con.createStatement();
			rs =stat.executeQuery(sql);
		}
		catch(Exception e){
			e.printStackTrace();
		}
		return rs;
	}
	public void update(String sql)
	{
		try{
		con=getCon();
		stat=con.createStatement();
		stat.executeUpdate(sql);
	}
	catch(Exception e){
		e.printStackTrace();
	}
		
	}
	public void update(String sql,String[] args)
	{
		try{
		con=getCon();
		pstat=con.prepareStatement(sql);
		for(int i=0;i<args.length;i++){
		pstat.setString(i+1,args[i]);
		}
		pstat.executeUpdate();
	}
	catch(Exception e){
		e.printStackTrace();
	}
		
	}
	public void close()
	{
		try{
			if(rs!=null) rs.close();
			if(stat!=null) stat.close();
			if(pstat!=null) pstat.close();
			if(con!=null) con.close();
		}catch(Exception e)
		{
			e.printStackTrace();
		}
	}
}
