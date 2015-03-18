package com.news.dao;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.swing.text.AbstractDocument.Content;

import org.apache.struts2.ServletActionContext;
import org.dom4j.Attribute;
import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.Element;
import org.springframework.stereotype.Repository;

import com.news.common.response.SelectOptionVO;
import com.news.common.util.XmlUtil;
import com.news.entity.NewsEntity;
import com.news.entity.NewsTypeEntity;
import com.sun.org.apache.bcel.internal.generic.Select;
@Repository("newsDAO")
public class NewsDAOImpl implements NewsDAO {
	@Override
	public void addtype(String type) {
		XmlUtil xmlUtil = new XmlUtil("news.xml");
		try {
			Document document = xmlUtil.getDocument();
			Element root = document.getRootElement();
			Element newstype = root.addElement("type");
			newstype.addAttribute("id", UUID.randomUUID().toString());
			newstype.addAttribute("name", type);
			xmlUtil.writetoXml(document);
		} catch (Exception e) {
			throw new RuntimeException();
		}

	}
	@Override
	public void add(NewsEntity news) {
		XmlUtil xmlUtil = new XmlUtil("news.xml");
		try {
			Document document = xmlUtil.getDocument();
			Element root = document.getRootElement();
			Element elemtype = (Element) document
					.selectSingleNode("//type[@name='" + news.getType() + "']");
			Element elem = elemtype.addElement("news");
			elem.setAttributeValue("id",news.getId());
			elem.setAttributeValue("title", news.getTitle());
			elem.setAttributeValue("content", news.getContent());
			elem.setAttributeValue("editor", news.getEditor());
			elem.setAttributeValue("status", news.getStatus());
			elem.setAttributeValue("time", news.getTime());
			elem.setAttributeValue("imagekey", news.getImagekey());
			xmlUtil.writetoXml(document);
		} catch (Exception e) {
			throw new RuntimeException();
		}

	}

	@Override
	public List<NewsTypeEntity> querytype() {
		XmlUtil xmlUtil = new XmlUtil("news.xml");
		try {
			Document document = xmlUtil.getDocument();
			Element root = document.getRootElement();
			List nodes = root.elements("type");
			List<NewsTypeEntity> attr=new ArrayList<NewsTypeEntity>();
			for (Iterator it = nodes.iterator(); it.hasNext();) {
				Element elm = (Element) it.next();
				NewsTypeEntity newsType=new NewsTypeEntity();
				newsType.setId(elm.attribute("id").getText());
				newsType.setName(elm.attribute("name").getText());
				attr.add(newsType);
			}
			return attr;
		} catch (Exception e) {
			throw new RuntimeException();
		}

	}
//	@Override
//	public List<NewsTypeEntity> querytype(String id) {
//		XmlUtil xmlUtil = new XmlUtil("news.xml");
//		try {
//			Document document = xmlUtil.getDocument();
//			Element root = document.getRootElement();
//			Element element = (Element) document
//					.selectSingleNode("//type[@id='" + id + "']");
//			List<NewsTypeEntity> attr=new ArrayList<NewsTypeEntity>();
//				NewsTypeEntity newsType=new NewsTypeEntity();
//				newsType.setId(element.attribute("id").getText());
//				newsType.setName(element.attribute("name").getText());
//				attr.add(newsType);
//			return attr;
//		} catch (Exception e) {
//			throw new RuntimeException();
//		}
//
//	}
	
	@Override
	public List<SelectOptionVO> querytypeselect() {
		XmlUtil xmlUtil = new XmlUtil("news.xml");
		try {
			Document document = xmlUtil.getDocument();
			Element root = document.getRootElement();
			List nodes = root.elements("type");
			List<SelectOptionVO> attr=new ArrayList<SelectOptionVO>();
			for (Iterator it = nodes.iterator(); it.hasNext();) {
				Element elm = (Element) it.next();
				attr.add(new SelectOptionVO(elm.attribute("id").getText(),elm.attribute("name").getText()));
			}
			return attr;
		} catch (Exception e) {
			throw new RuntimeException();
		}

	}

	@Override
	public List<NewsEntity> querytitle(String type) {
		XmlUtil xmlUtil = new XmlUtil("news.xml");
		try {
			Document document = xmlUtil.getDocument();
			Element element = (Element) document
					.selectSingleNode("//type[@name='" + type + "']");
			List nodes = element.elements("news");
			List<NewsEntity> attr=new ArrayList<NewsEntity>();
			for (Iterator it = nodes.iterator(); it.hasNext();) {
				NewsEntity news=new NewsEntity();
				Element elm = (Element) it.next();
				news.setTitle(elm.attribute("title")
						.getText());
				news.setId(elm.attribute("id").getText());
				news.setContent(elm.attribute("content").getText());
				news.setTime(elm.attribute("time").getText());
				news.setImagekey(elm.attribute("imagekey").getText());
				news.setStatus(elm.attribute("status").getText());
				news.setEditor(elm.attribute("editor").getText());
				news.setType(type);
				attr.add(news);
			}
			return attr;
		} catch (Exception e) {
			throw new RuntimeException();
		}
	}
	@Override
	public List<NewsEntity> queryindextitle(String type) {
		XmlUtil xmlUtil = new XmlUtil("news.xml");
		try {
			Document document = xmlUtil.getDocument();
			List element =  document.selectNodes("//type[@name='" + type + "']/news[@status='通过']");
			List<NewsEntity> attr=new ArrayList<NewsEntity>();
			for (Iterator it = element.iterator(); it.hasNext();) {
				NewsEntity news=new NewsEntity();
				Element elm = (Element) it.next();
				news.setTitle(elm.attribute("title")
						.getText());
				news.setId(elm.attribute("id").getText());
				news.setContent(elm.attribute("content").getText());
				news.setTime(elm.attribute("time").getText());
				news.setImagekey(elm.attribute("imagekey").getText());
				news.setStatus(elm.attribute("status").getText());
				news.setEditor(elm.attribute("editor").getText());
				news.setType(type);
				attr.add(news);
			}
			return attr;
		} catch (Exception e) {
			throw new RuntimeException();
		}
	}
	@Override
	public List<NewsEntity> querynews(String id,String type)
	{
		XmlUtil xmlUtil = new XmlUtil("news.xml");
		try {
			Document document = xmlUtil.getDocument();
			Element element = (Element) document
					.selectSingleNode("//type[@name='" + type + "']/news[@id='" + id + "']");
			List<NewsEntity> attr=new ArrayList<NewsEntity>();
				NewsEntity news=new NewsEntity();
				news.setTitle(element.attribute("title")
						.getText());
				news.setType(type);
				news.setId(element.attribute("id").getText());
				news.setContent(element.attribute("content").getText());
				news.setTime(element.attribute("time").getText());
				news.setImagekey(element.attribute("imagekey").getText());
				news.setStatus(element.attribute("status").getText());
				news.setEditor(element.attribute("editor").getText());
				attr.add(news);
			return attr;
		} catch (Exception e) {
			throw new RuntimeException();
		}
	}
	@Override
	public List<NewsEntity> querynewsstatus(String username)
	{
		XmlUtil xmlUtil = new XmlUtil("news.xml");
		try {
			Document document = xmlUtil.getDocument();
			Element root = document.getRootElement();
			List nodes = root.elements("type");
			List<NewsEntity> attr=new ArrayList<NewsEntity>();
			for (Iterator it = nodes.iterator(); it.hasNext();) {
				Element elem =(Element) it.next();
				List nodes2 = elem.elements("news");
				for (Iterator it2 = nodes2.iterator(); it2.hasNext();) {
					NewsEntity news=new NewsEntity();
				Element elem2 = (Element) it2.next();
				if(elem2.attribute("editor").getText().equals(username)){
				news.setTitle(elem2.attribute("title").getText());
				news.setType(elem.attribute("name").getText());
				news.setId(elem2.attribute("id").getText());
				news.setContent(elem2.attribute("content").getText());
				news.setTime(elem2.attribute("time").getText());
				news.setImagekey(elem2.attribute("imagekey").getText());
				news.setStatus(elem2.attribute("status").getText());
				attr.add(news);
				}
				}
			}
			return attr;
		} catch (Exception e) {
			throw new RuntimeException();
		}
	}
	
	
	@Override
	public String querycontent(String id, String type) {
		XmlUtil xmlUtil = new XmlUtil("news.xml");
		try {
			Document document = xmlUtil.getDocument();
			Element root = document.getRootElement();
			Element elem = (Element) document.selectSingleNode("//type[@name='"
					+ type + "']/news[@id='" + id + "']");
			return elem.attribute("content").getText();

		} catch (Exception e) {
			throw new RuntimeException();
		}
	}
   
	// public List querytitle(String type) {
	// XmlUtil xmlUtil =new XmlUtil("news.xml");
	// try {
	// Document document =xmlUtil.getDocument();
	// Element root = document.getRootElement();
	// Element element = (Element)
	// document.selectSingleNode("//type[@name='"+type+"']");
	// List nodes = element.elements("news");
	// List attr = new ArrayList();
	// for (Iterator it = nodes.iterator(); it.hasNext();)
	// {
	// Element elm = (Element) it.next();
	// attr.add(elm.attribute("title").getText());
	// }
	// return attr;
	// } catch (Exception e) {
	// throw new RuntimeException();
	// }
	// }
	@Override
	public void delete(String type) {
		XmlUtil xmlUtil = new XmlUtil("news.xml");
		try {
			Document document = xmlUtil.getDocument();
			Element root = document.getRootElement();
			Element element = (Element) document
					.selectSingleNode("//type[@name='" + type + "']");
			root.remove(element);
			xmlUtil.writetoXml(document);
		} catch (Exception e) {
			throw new RuntimeException();
		}
	}

	@Override
	public void delete(String type, String id) {
		XmlUtil xmlUtil = new XmlUtil("news.xml");
		try {
			Document document = xmlUtil.getDocument();
			Element elementtype =  (Element) document
					.selectSingleNode("//type[@name='" + type + "']");
			Element element = (Element) document
					.selectSingleNode("//type[@name='" + type + "']/news[@id='"
							+ id + "']");
			elementtype.remove(element);
			xmlUtil.writetoXml(document);
		} catch (Exception e) {
			throw new RuntimeException();
		}
	}
	@Override
	 public void updatetype(String id,String type){
		XmlUtil xmlUtil = new XmlUtil("news.xml");
	 try {
	 Document document =xmlUtil.getDocument();
     Element element = (Element)
     document.selectSingleNode("//type[@id='"+id+"']");
	 Attribute attr1 = element.attribute("name");
	 attr1.setValue(type);
	 xmlUtil.writetoXml(document);
	 } catch (Exception e) {
	 throw new RuntimeException();
	 }
	 }
	@Override
	 public void updatenewstype(String id,String oldtype,String newtype){
		XmlUtil xmlUtil = new XmlUtil("news.xml");
	 try {
	 Document document =xmlUtil.getDocument();
	 Element idelement = (Element)
		     document.selectSingleNode("//type[@id='"+newtype+"']");
	 String type =idelement.attribute("name").getText();
	 Element element = (Element) document.selectSingleNode("//type[@name='" + oldtype + "']");
	 Element oldelement = (Element) document.selectSingleNode("//type[@name='" + oldtype + "']/news[@id='"
						+ id + "']");
	 Element newelement = (Element) document
				.selectSingleNode("//type[@name='" + type+ "']");
		Element elem = newelement.addElement("news");
		elem.setAttributeValue("id",oldelement.attribute("id").getText());
		elem.setAttributeValue("title", oldelement.attribute("title").getText());
		elem.setAttributeValue("content", oldelement.attribute("content").getText());
		elem.setAttributeValue("editor", oldelement.attribute("editor").getText());
		elem.setAttributeValue("status", oldelement.attribute("status").getText());
		elem.setAttributeValue("time", oldelement.attribute("time").getText());
		elem.setAttributeValue("imagekey", oldelement.attribute("imagekey").getText());
		element.remove(oldelement);
	 xmlUtil.writetoXml(document);
	 } catch (Exception e) {
	 throw new RuntimeException();
	 }
	 }
	@Override
	 public void updatenews(NewsEntity news){
		XmlUtil xmlUtil = new XmlUtil("news.xml");
	 try {
	 Document document =xmlUtil.getDocument();
	 Element element =(Element)
	 document.selectSingleNode("//type[@name='"+news.getType()+"']/news[@id='"+news.getId()+"']");
	 Attribute attr1 = element.attribute("title");
	 attr1.setValue(news.getTitle());
	 Attribute attr2 = element.attribute("content");
	 attr2.setValue(news.getContent());
	 Attribute attr3 = element.attribute("time");
	 attr3.setValue(news.getTime());
	 Attribute attr4 = element.attribute("imagekey");
	 attr4.setValue(news.getImagekey());
	 xmlUtil.writetoXml(document);
	 } catch (Exception e) {
	 throw new RuntimeException();
	 }
	 }
    @Override
    public void updatenewsstatus(NewsEntity news)
    {
    	XmlUtil xmlUtil = new XmlUtil("news.xml");
		try {
			Document document = xmlUtil.getDocument();
			Element element =(Element)
		    document.selectSingleNode("//type[@name='"+news.getType()+"']/news[@id='"+news.getId()+"']");
			 Attribute attr = element.attribute("status");
			 attr.setValue(news.getStatus());
			 xmlUtil.writetoXml(document);
		} catch (Exception e) {
			throw new RuntimeException();
		}
    }
    
}
