package com.news.dao;

import java.util.List;
import java.util.Map;

import com.news.common.response.SelectOptionVO;
import com.news.entity.NewsEntity;
import com.news.entity.NewsTypeEntity;

public interface NewsDAO {

	void addtype(String type);

	void add(NewsEntity news);

	void delete(String type);

	void delete(String type, String id);
    void updatetype(String id,String type);
	// public void updata(String type){
	// try {
	// Document document =XmlUtil.getDocument();
	// Element element = (Element)
	// document.selectSingleNode("//type[@name='"+type+"']");
	// NewsEntity news = new NewsEntity();
	// news.setType(element.attributeValue("name"));
	// XmlUtil.writetoXml(document);
	// } catch (Exception e) {
	// throw new RuntimeException();
	// }
	// }
	// public void updata(String type,Integer id){
	// try {
	// Document document =XmlUtil.getDocument();
	// Element element = (Element)
	// document.selectSingleNode("//type[@name='"+type+"']");
	// Element elementid =(Element)
	// document.selectSingleNode("/type[@name='"+type+"']//title[@id='"+id+"']");
	// elementid
	// } catch (Exception e) {
	// throw new RuntimeException();
	// }
	// }

	List<NewsEntity> querytitle(String type);

	String querycontent(String id, String type);

	List<NewsTypeEntity> querytype();

	List<NewsEntity> querynews(String id, String type);

	void updatenews(NewsEntity news);

	List<NewsEntity> querynewsstatus(String username);

	void updatenewsstatus(NewsEntity news);

	List<SelectOptionVO> querytypeselect();

	void updatenewstype(String id, String oldtype, String newtype);

	List<NewsEntity> queryindextitle(String type);

}