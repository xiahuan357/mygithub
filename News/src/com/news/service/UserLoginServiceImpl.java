package com.news.service;

import java.sql.ResultSet;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.news.dao.UserDAO;
import com.news.entity.UserEntity;

@Service("userLoginService")
public class UserLoginServiceImpl {
	@Resource(name="userdao")
	private UserDAO userdao;

	// ע���ҵ���߼�
//	public void register(UserEntity user) {
//
//		boolean boo = userdao.query(user.getUsertype(), user.getUsername());
//		if (!boo) {
//			throw new RuntimeException();
//		} else
//			userdao.creat(user);
//
//	}

	// 登陆
	public UserEntity login(String username, String password) {
	   return userdao.query(username, password);
	}
     public void updateposition(Integer id,Integer usertype)
     {
    	  userdao.updateposition(id,usertype);
     }
     public void updatedeparment(Integer id,String deparment)
     {
    	  userdao.updatedeparment(id,deparment);
     }
	public List<UserEntity> queryuser() {
		   return userdao.query();
		}
	public void adduser(UserEntity user)
	{
		userdao.creat(user);
	}
	public boolean checkusername(String username)
	{
		return userdao.checkusername(username);
	}
	public void setDao(UserDAO userdao) {
		this.userdao = userdao;
	}
	
}
