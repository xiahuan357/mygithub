package com.news.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.dom4j.Document;
import org.dom4j.Element;
import org.springframework.stereotype.Repository;

import com.news.common.util.XmlUtil;
import com.news.entity.UserEntity;
import com.news.user.bean.UserConnBean;

@Repository("userdao")
public class UserDAOImpl implements UserDAO {
    
	@Resource(name="userBean")
	private UserConnBean userBean;
	public void creat(UserEntity user)
	{   
		Connection con=userBean.getCon();
	try{
        String sql ="insert into user(username,password,email,phone_number,usertype,userstatus) values(?,?,?,?,?,?);";
        PreparedStatement ps = con.prepareStatement(sql);
    	ps.setString(1, user.getUsername());
    	ps.setString(2, user.getPassword());
    	ps.setString(3, user.getEmail());
    	ps.setString(4, user.getPhone_number());
    	ps.setInt(5, user.getUsertype());
    	ps.setInt(6, user.getUserstatus());
    	ps.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				if (con != null)
					con.close();
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
	}
	@Override
   public  boolean checkusername(String username)
   {
	   String sql = "select id from user where username='"+username+"'";
	   ResultSet rs = userBean.query(sql);
	   try {
		if(rs.next())
				{   
			      userBean.close();
					return true;
				}
				else
				{   userBean.close();
					return false;
				}
	} catch (Exception e) {
		e.printStackTrace();
	}
	   return false;
	   
   }
//	public boolean query(String username,String password) throws Exception
//	{
//		String sql="select * from user where username='"+username+"'and password='"+password+"'";
//		ResultSet rs = userBean.query(sql);
//		 userBean.close();
//			if(rs.next())
//			{
//				return true;
//			}
//			else
//			{
//				return false;
//			}
//		
//	}
	public UserEntity query(String username,String password)
	{   
		UserEntity user=new UserEntity();
		String sql="select * from user where username='"+username+"'and password='"+password+"'";
		ResultSet rs=userBean.query(sql);
		try {
			if (rs.next()) {
				user.setUsertype(rs.getInt("usertype"));
				user.setId(rs.getInt("id"));
				user.setUserstatus(rs.getInt("userstatus"));
				user.setUsername(rs.getString("username"));
				user.setPassword(rs.getString("password"));
				user.setDepartment(rs.getString("department"));
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		 userBean.close();
		return user;
	}
	@Override
	public List<UserEntity> query()
	{   
		String sql="select * from user where usertype =1 or usertype =2";
		ResultSet rs=userBean.query(sql);
		List<UserEntity> attr =new ArrayList<UserEntity>();
		try {
			while(rs.next()) {
				UserEntity user=new UserEntity();
				user.setUsertype(rs.getInt("usertype"));
				user.setId(rs.getInt("id"));
				user.setUserstatus(rs.getInt("userstatus"));
				user.setUsername(rs.getString("username"));
				user.setPassword(rs.getString("password"));
				user.setDepartment(rs.getString("department"));
				attr.add(user);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		 userBean.close();
		return attr;
	}
	@Override
	public void updateposition(Integer id,Integer usertype)
	{
		String sql ="update user set usertype ='"+usertype+"' where id ='"+id+"'";
		userBean.update(sql);
	}
	@Override
	public void updatedeparment(Integer id,String department)
	{  
		XmlUtil xmlUtil = new XmlUtil("news.xml");
		String type;
		try {
			 Document document = xmlUtil.getDocument();
			 Element idelement = (Element)
				     document.selectSingleNode("//type[@id='"+department+"']");
			 type =idelement.attribute("name").getText();
		} catch (Exception e) {
			 throw new RuntimeException();
		}
		String sql ="update user set department ='"+type+"' where id ='"+id+"'";
		userBean.update(sql);
	}
  public void setBean(UserConnBean userBean)
  {
	  this.userBean=userBean;
  }
	
}