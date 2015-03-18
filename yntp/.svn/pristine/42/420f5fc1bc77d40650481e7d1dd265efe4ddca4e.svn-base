package com.yn.yntp.common.persistence.search;

import java.util.List;

import org.apache.commons.lang3.tuple.ImmutableTriple;
import org.apache.commons.lang3.tuple.Triple;

import com.yn.yntp.common.entity.search.ClientOperation;

/**
 * 
 * @Title: HqlUtil.java
 * @Package com.yn.yntp.common.dao
 * @Description: hql 语句工具类, 主要用途：根据Triple生成hql的where子句
 *
 * @author liucc
 * @date 2014年11月21日 下午7:37:27
 * @version V1.0
 */
public class HqlUtil {
  /**
   * 数据库中的日期列名
   */
  public final static String DBCOL_DATE = "date";

  public final static String DATE_START_POSTFIX = "00:00:00.000";

  public final static String DATE_END_POSTFIX = "23:59:59.999";

  /**
   * 根据ClientOperation得到查询条件限制符
   * 
   * @param op
   * @return 查询条件限制符
   */
  public static String getRestriction(ClientOperation op) {
    switch (op) {
      case STARTS_WITH:
      case CONTAINS:
      case ENDS_WITH:
        return "like";
      case NEG_STARTS_WITH:
      case NEG_CONTAINS:
      case NEG_ENDS_WITH:
        return "not like";
      case EQ:
        return "=";
      case NEG_EQ:
        return "<>";
      case GE:
        return ">=";
      case GT:
        return ">";
      case LE:
        return "<=";
      case LT:
        return "<";
      case IN:
        return "in";
      case NEG_IN:
        return "not in";
      default:
        return null;
    }
  }

  /**
   * 为date列生成单个查询条件
   * eg.
   * 1. date=2014-04-01 生成查询条件 and date>='2014-04-01 00:00:00.000' and
   * date<='2014-04-01 23:59:59.999'
   * 2. date<=2014-04-01 生成查询条件 and date<='2014-04-01 23:59:59.999'
   * 3. date<2014-04-01 生成查询条件 and date<'2014-04-01 00:00:00.000'
   * 4. date>=2014-04-01 生成查询条件 and date<='2014-04-01 00:00:00.000'
   * 5. date>2014-04-01 生成查询条件 and date>'2014-04-01 23:59:59.999'
   * 
   * @param tableColName 表名.查询字段
   * @param triple 查询条件三元组
   * @return
   */
  public static String getSingleWhereForDate(String tableColName,
      Triple<String, ClientOperation, String> triple) {
    if (!triple.getLeft().equals(DBCOL_DATE))
      return "";

    if (triple.getMiddle() == ClientOperation.EQ) {
      Triple<String, ClientOperation, String> triple1 =
          new ImmutableTriple<String, ClientOperation, String>(
              triple.getLeft(), ClientOperation.GE, triple.getRight() + " "
                  + DATE_START_POSTFIX);

      Triple<String, ClientOperation, String> triple2 =
          new ImmutableTriple<String, ClientOperation, String>(
              triple.getLeft(), ClientOperation.LE, triple.getRight() + " "
                  + DATE_END_POSTFIX);

      return getSingleWhere(tableColName, triple1)
          + getSingleWhere(tableColName, triple2);
    }
    else if (triple.getMiddle() == ClientOperation.LE) {
      Triple<String, ClientOperation, String> triple1 =
          new ImmutableTriple<String, ClientOperation, String>(
              triple.getLeft(), triple.getMiddle(), triple.getRight() + " "
                  + DATE_END_POSTFIX);
      return getSingleWhere(tableColName, triple1);
    }
    else if (triple.getMiddle() == ClientOperation.LT) {
      Triple<String, ClientOperation, String> triple1 =
          new ImmutableTriple<String, ClientOperation, String>(
              triple.getLeft(), triple.getMiddle(), triple.getRight() + " "
                  + DATE_START_POSTFIX);
      return getSingleWhere(tableColName, triple1);
    }
    else if (triple.getMiddle() == ClientOperation.GE) {
      Triple<String, ClientOperation, String> triple1 =
          new ImmutableTriple<String, ClientOperation, String>(
              triple.getLeft(), triple.getMiddle(), triple.getRight() + " "
                  + DATE_START_POSTFIX);
      return getSingleWhere(tableColName, triple1);
    }
    else if (triple.getMiddle() == ClientOperation.GT) {
      Triple<String, ClientOperation, String> triple1 =
          new ImmutableTriple<String, ClientOperation, String>(
              triple.getLeft(), triple.getMiddle(), triple.getRight() + " "
                  + DATE_END_POSTFIX);
      return getSingleWhere(tableColName, triple1);
    }

    return "";
  }

  /**
   * 生成单个查询条件
   * 
   * @param tableColName 表名.查询字段
   * @param triple 查询条件三元组
   * @return
   */
  public static String getSingleWhere(String tableColName,
      Triple<String, ClientOperation, String> triple) {
    String restrict = getRestriction(triple.getMiddle());
    if (restrict == null)
      return "";

    String left = "'", right = "'";
    if ("null".equalsIgnoreCase(triple.getRight())) {
      // 查询空对象的情况，条件特殊处理
      if (ClientOperation.EQ.equals(triple.getMiddle())) {
        left = "";
        right = "";
        restrict = "is";
      }
      else if (ClientOperation.NEG_EQ.equals(triple.getMiddle())) {
        left = "";
        right = "";
        restrict = "is not";
      }
    }
    if (triple.getMiddle() == ClientOperation.IN
        || triple.getMiddle() == ClientOperation.NEG_IN) {
      left = "(";
      right = ")";
    }
    return " and " + tableColName + " " + restrict + " " + left
        + triple.getRight() + right;
  }

  /**
   * 根据表名和查询条件三元组生成where子句
   * 
   * @param tablename
   * @param parsedQuery
   * @return
   */
  public static String getHqlWhere(String tablename,
      List<Triple<String, ClientOperation, String>> parsedQuery) {
    StringBuilder where = new StringBuilder(" where 1 = 1");
    String tableColName = null;
    for (int i = 0; i < parsedQuery.size(); i++) {
      Triple<String, ClientOperation, String> tri = parsedQuery.get(i);
      tableColName = tablename + "." + tri.getLeft();
      if (tri.getLeft().equalsIgnoreCase(DBCOL_DATE)) {
        where.append(getSingleWhereForDate(tableColName, tri));
      }
      else {
        where.append(getSingleWhere(tableColName, tri));
      }
    }
    return where.toString();
  }

  /**
   * 根据表名字段和查询条件三元组列表生成where子句，要求两个列表长度相同
   * 
   * @param tableColName
   * @param parsedQuery
   * @return
   */
  public static String getHqlWhere(List<String> tableColName,
      List<Triple<String, ClientOperation, String>> parsedQuery) {
    return getHqlWhere(tableColName, parsedQuery, true);
  }

  /**
   * 根据表名字段和查询条件三元组列表生成where子句，要求两个列表长度相同
   * 
   * @param tableColName 表名字段列表
   * @param parsedQuery 查询条件三元组列表
   * @param hasWhere 生成的子句是否包含where 1=1
   * @return
   */
  public static String getHqlWhere(List<String> tableColName,
      List<Triple<String, ClientOperation, String>> parsedQuery,
      boolean hasWhere) {
    assert (tableColName.size() == parsedQuery.size());

    StringBuilder where = new StringBuilder("");
    if (hasWhere) {
      where.append(" where 1 = 1");
    }
    for (int i = 0; i < parsedQuery.size(); i++) {
      Triple<String, ClientOperation, String> tri = parsedQuery.get(i);
      if (tri.getLeft().equalsIgnoreCase(DBCOL_DATE)) {
        where.append(getSingleWhereForDate(tableColName.get(i), tri));
      }
      else {
        where.append(getSingleWhere(tableColName.get(i), tri));
      }
    }
    return where.toString();
  }
}
