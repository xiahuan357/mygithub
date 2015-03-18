package com.news.dao;

import java.sql.ResultSet;
import java.util.List;

import com.news.entity.UserEntity;

public interface UserDAO {

	void creat(UserEntity user);

//	ResultSet query(String username, String password) throws Exception;

	UserEntity query(String username,String password);

	List<UserEntity> query();

	void updateposition(Integer id, Integer usertype);

	void updatedeparment(Integer id, String department);

	boolean checkusername(String username);

}