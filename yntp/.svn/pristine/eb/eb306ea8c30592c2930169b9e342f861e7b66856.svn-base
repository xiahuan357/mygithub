package com.yn.yntp.common.persistence.dao;

import java.io.Serializable;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import javax.persistence.Table;

import org.apache.commons.lang3.tuple.Triple;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.type.BasicType;
import org.springframework.beans.factory.annotation.Autowired;

import com.yn.yntp.common.entity.search.ClientOperation;
import com.yn.yntp.common.persistence.search.HqlUtil;
import com.yn.yntp.common.tool.Reflections;

/**
 * 
 * @Title: GenericBaseDao.java
 * @Package com.yn.yntp.common.dao
 * @Description: 封装基本增删改查
 *
 * @author liucc
 * @date 2014年11月21日 下午5:32:09
 * @version V1.0
 */
public class GenericBaseDao<M, ID extends Serializable> {

	@Autowired
	private SessionFactory sessionFactory;

	/**
	 * 实体类类型(由构造方法自动赋值)
	 */
	private Class<?> entityClass;

	public GenericBaseDao() {
		entityClass = Reflections.getClassGenricType(getClass());
	}

	public Session getSession() {
		return sessionFactory.getCurrentSession();
	}

	/**
	 * 获取Entity的表名
	 * 
	 * @return
	 */
	public String getTableName() {
		Table annotation = (Table) entityClass.getAnnotation(Table.class);
		if (annotation != null) {
			return annotation.name();
		}

		return null;
	}

	/*
	 * 根据主键获取查询结果
	 */
	@SuppressWarnings("unchecked")
	public M get(ID id) {
		return (M) getSession().get(entityClass, id);
	}

	/**
	 * 根据主键集合查询结果
	 * 
	 * @param entityClass
	 * @param ids
	 * @return
	 */
	public List<M> get(List<ID> ids) {
		StringBuilder hql = new StringBuilder();
		hql.append(" from " + entityClass.getName() + " where id in(:ids)");

		Query query = createQuery(hql.toString()).setParameterList("ids", ids);
		@SuppressWarnings("unchecked")
		List<M> items = query.list();
		return items;
	}

	/*
	 * hql查询返回首结果
	 */
	@SuppressWarnings("unchecked")
	public M getFromHql(String hql) {
		List<M> l = createQuery(hql).list();
		if (l != null && l.size() > 0)
			return l.get(0);
		return null;
	}

	/*
	 * hql查询返回首结果 支持参数从map传入
	 */
	@SuppressWarnings("unchecked")
	public M getFromHql(String hql, Map<String, Object> params) {
		Query q = createQueryWithParams(hql, params);
		List<M> l = q.list();
		if (l != null && l.size() > 0)
			return l.get(0);
		return null;
	}

	/*
	 * 获取class对应table的所有行数据
	 */
	@SuppressWarnings({ "unchecked" })
	public List<M> getAllList() {
		return getSession().createCriteria(entityClass).list();
	}

	/*
	 * hql查询获取匹配数据行
	 */
	@SuppressWarnings("unchecked")
	public List<M> find(String hql) {
		return createQuery(hql).list();
	}

	/*
	 * hql查询获取匹配数据行 支持参数从map传入
	 */
	@SuppressWarnings("unchecked")
	public List<M> find(String hql, Map<String, Object> params) {
		Query q = createQueryWithParams(hql, params);
		return q.list();
	}

	/*
	 * hql查询获取分页数据行 page->查询第page页 rows->查询页包含rows行
	 */
	@SuppressWarnings("unchecked")
	public List<M> find(String hql, int page, int rows) {
		Query q = createQuery(hql);
		return q.setFirstResult((page - 1) * rows).setMaxResults(rows).list();
	}

	/*
	 * hql查询获取分页数据行 支持参数从map传入 page->查询第page页 rows->查询页包含rows行
	 */
	@SuppressWarnings("unchecked")
	public List<M> find(String hql, Map<String, Object> params, int page,
			int rows) {
		Query q = createQueryWithParams(hql, params);
		return q.setFirstResult((page - 1) * rows).setMaxResults(rows).list();
	}

	/*
	 * hql查询获取匹配数
	 */
	public int count(String hql) {
		Query q = createQuery(hql);
		return ((Long) q.uniqueResult()).intValue();
	}

	/*
	 * hql查询获取匹配数 支持参数从map传入
	 */
	public int count(String hql, Map<String, Object> params) {
		Query q = createQueryWithParams(hql, params);
		return ((Long) q.uniqueResult()).intValue();
	}

	/*
     * 
     */
	public Serializable save(M o) {
		return getSession().save(o);
	}

	public void saveOrUpdate(M obj) {
		Session session = getSession();
		session.saveOrUpdate(obj);
	}

	public void insert(M o) {
		Session session = getSession();
		session.save(o);
	}

	public void insert(List<M> objs) {
		Session session = getSession();
		for (M obj : objs) {
			session.save(obj);
		}
	}

	public void update(M o) {
		Session session = getSession();
		session.update(o);
	}

	public void update(List<M> objs) {
		Session session = getSession();
		for (M obj : objs) {
			session.update(obj);
		}
	}

	public void delete(M o) {
		Session session = getSession();
		session.delete(o);
	}

	public void delete(ID id) {
		Session session = getSession();
		Object obj = session.get(entityClass, id);
		session.delete(obj);
	}

	public void delete(ID[] ids) {
		Session session = getSession();
		for (ID id : ids) {
			M o = get(id);
			session.delete(o);
		}
		session.flush();
	}

	public void delete(List<ID> ids) {
		Session session = getSession();
		for (ID id : ids) {
			M o = get(id);
			session.delete(o);
		}
		session.flush();
	}

	public void updateCondition(String hql, Map<String, Object> params) {
		Query q = createQueryWithParams(hql, params);
		q.executeUpdate();
	}

	public void deleteCondition(String hql, Map<String, Object> params) {
		Query q = createQueryWithParams(hql, params);
		q.executeUpdate();
	}

	/*
	 * 根据Hql创建查询
	 */
	public Query createQuery(String hql) {
		return getSession().createQuery(hql);
	}

	/*
	 * 根据Sql创建查询
	 */
	public SQLQuery createSQLQuery(String sql) {
		return getSession().createSQLQuery(sql);
	}

	/**
	 * 根据Map参数创建查询
	 * 
	 * @param hql
	 * @param params
	 * @return
	 */
	public Query createQueryWithParams(String hql, Map<String, Object> params) {
		Query q = createQuery(hql);
		if (params != null && !params.isEmpty()) {
			for (String key : params.keySet())
				q.setParameter(key, params.get(key));
		}
		return q;
	}

	// ---------------三元组查询 - append by liuchchc 2014-6-19 21:08:11----------
	/**
	 * 根据条件拼Qql查询语句，查询指定字段
	 * 
	 * @param filedNameMap
	 *            查询的字段以及数据类型
	 * @param parsedQuery
	 *            条件三元组
	 * @return
	 */
	public String getTripleSqlWithSpecialFiled(
			Map<String, BasicType> filedNameMap,
			List<Triple<String, ClientOperation, String>> parsedQuery) {
		StringBuilder hql = new StringBuilder();
		hql.append(" select ");
		if (filedNameMap == null || filedNameMap.isEmpty()) {
			hql.append(" o ");
		} else {
			for (Entry<String, BasicType> entry : filedNameMap.entrySet()) {

				hql.append("o." + entry.getKey()).append(",");
			}
		}
		if (hql.indexOf(",") > 0) {
			hql = hql.deleteCharAt(hql.length() - 1);
		}

		hql.append(" from " + this.getTableName() + " o");

		hql.append(HqlUtil.getHqlWhere("o", parsedQuery));

		return hql.toString();
	}

	/**
	 * 根据条件拼Hql查询语句，查询所有字段或数量
	 * 
	 * @param parsedQuery
	 *            查询条件三元组
	 * @param isCount
	 *            是否以count方式查询数量
	 * @return HQL语句
	 */
	public String getTripleHqlWithAllFiled(
			List<Triple<String, ClientOperation, String>> parsedQuery,
			boolean isCount) {
		StringBuilder hql = new StringBuilder("select");
		if (isCount) {
			hql.append(" count(o)");
		} else {
			hql.append(" o");
		}
		hql.append(" from " + entityClass.getSimpleName() + " o");

		hql.append(HqlUtil.getHqlWhere("o", parsedQuery));

		return hql.toString();
	}

	public String getUpdateHql(Map<String, Object> filedNameMap,
			List<Triple<String, ClientOperation, String>> parsedQuery) {
		StringBuilder hql = new StringBuilder();
		hql.append(" update ");
		hql.append(entityClass.getSimpleName() + " o set ");
		for (Entry<String, Object> entry : filedNameMap.entrySet()) {
			hql.append("o." + entry.getKey() + "='" + entry.getValue() + "',");
		}
		if (hql.indexOf(",") > 0) {
			hql = hql.deleteCharAt(hql.length() - 1);
		}

		hql.append(HqlUtil.getHqlWhere("o", parsedQuery));

		return hql.toString();
	}
}
