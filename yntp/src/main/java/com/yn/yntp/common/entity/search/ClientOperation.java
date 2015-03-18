package com.yn.yntp.common.entity.search;

/**
 * 
 * @Title: ClientOperation.java 
 * @Package com.yn.yntp.common.entity.search 
 * @Description: 查询支持的操作
 *
 * @author liucc    
 * @date 2014年11月21日 下午9:43:46 
 * @version V1.0
 */
public enum ClientOperation {
    EQ, NEG_EQ, CONTAINS, NEG_CONTAINS, STARTS_WITH, NEG_STARTS_WITH, ENDS_WITH, NEG_ENDS_WITH, LT, LE, GT, GE, IN, NEG_IN;

    public boolean isNegated() {
        switch (this) {
        case EQ:
            return false;
        case NEG_EQ:
            return true;

        case CONTAINS:
            return false;
        case STARTS_WITH:
            return false;
        case ENDS_WITH:
            return false;

        case NEG_CONTAINS:
            return true;
        case NEG_STARTS_WITH:
            return true;
        case NEG_ENDS_WITH:
            return true;
        case NEG_IN:
        	return true;

        default:
            return false;
        }
    }

}
