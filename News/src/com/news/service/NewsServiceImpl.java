package com.news.service;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.news.common.response.SelectOptionVO;
import com.news.dao.NewsDAO;
import com.news.dao.NewsDAOImpl;
import com.news.entity.NewsEntity;
import com.news.entity.NewsTypeEntity;

@Service("newsservice")
public class NewsServiceImpl {
	
	@Resource(name="newsDAO")
	private NewsDAO newsDAO ;

	public void add(NewsEntity news) {
		newsDAO.add(news);
	}

	public void addtype(String type) {
		newsDAO.addtype(type);
	}

	public void delete(String type, String id) {
		newsDAO.delete(type, id);
	}

	public void delete(String type) {
		newsDAO.delete(type);
	}

	public List<NewsTypeEntity> querytype() {
		return newsDAO.querytype();
	}
	public List<SelectOptionVO> querytypeselect() {
		return newsDAO.querytypeselect();
	}

	public String querycontent(String id, String type) {
		return newsDAO.querycontent(id, type);
	}

	public List<NewsEntity> querytitle(String type) {
		return newsDAO.querytitle(type);
	}
	public List<NewsEntity> queryindextitle(String type) {
		return newsDAO.queryindextitle(type);
	}
	public List<NewsEntity> querynews(String id ,String type) {
		return newsDAO.querynews(id,type);
	}
	
	public List<NewsEntity> querynewsstatus(String username) {
		return newsDAO.querynewsstatus(username);
	}
	public void updatetype(String id,String type)
	{
		 newsDAO.updatetype(id, type);
	}
	public void updatenewstype(String id,String oldtype,String newtype)
	{
		 newsDAO.updatenewstype(id, oldtype,newtype);
	}
	
	public void updatenews(NewsEntity news)
	{
		 newsDAO.updatenews(news);
	}
	public void updatenewsstatus(NewsEntity news)
	{
		 newsDAO.updatenewsstatus(news);
	}
	
	public void setDao(NewsDAO newsDAO)
	{
		this.newsDAO=newsDAO;
	}
}
