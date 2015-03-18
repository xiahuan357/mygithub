package com.yn.yntp.common.entity.search;

/**
 * 
 * @Title: QueryConstants.java 
 * @Package com.yn.yntp.common.entity.search 
 * @Description: 查询常量类。
 *
 * @author liucc    
 * @date 2014年11月21日 下午9:44:11 
 * @version V1.0
 */
public final class QueryConstants {

    public static final String QUESTIONMARK = "?";

    public static final String PAGE = "page";
    public static final String START = "start";
    public static final String SIZE = "size";
    public static final String SORT_BY = "sortBy";
    public static final String SORT_ORDER = "sortOrder";
    public static final String Q_SORT_BY = QUESTIONMARK + SORT_BY + QueryConstants.OP_EQ;
    public static final String S_ORDER = QueryConstants.SEPARATOR_AMPER + QueryConstants.SORT_ORDER + QueryConstants.OP_EQ;
    public static final String S_ORDER_ASC = S_ORDER + "ASC";
    public static final String S_ORDER_DESC = S_ORDER + "DESC";

    /** - note: this character represents the ANY wildcard for the server side (persistence layer) */
    public static final String ANY_SERVER = "%";
    /** - note: this character represents the ANY wildcard for the client consumption of the API */
    public static final String ANY_CLIENT = "*";
    public static final String QUERY_PREFIX = QUESTIONMARK + "q=";
    public static final String Q_PARAM = "q";
    public static final String SEPARATOR = ";";
    public static final String SEPARATOR_AMPER = "&";
    public static final String SEPARATOR_ARRAY = ",";
    //public static final String OP = "=";
    public static final String NEGATION = "~";
    public static final String OP_EQ = "=";
    //public static final String OP_NEQ = "~=";
    public static final String OP_LT = "<";
    public static final String OP_LE = "<=";
    public static final String OP_GT = ">";
    public static final String OP_GE = ">=";
    public static final String OP_IN = "[]=";

    public static final String SEARCHTEXT = "searchtext"; // 可映射到多个字段的模糊检索条件
    public static final String ID = "id"; // is constant because it's used for the controller mapping
    public static final String UUID = "uuid";

    private QueryConstants() {
        throw new AssertionError();
    }
}
