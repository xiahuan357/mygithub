package com.yn.yntp.common.entity.pagination;

import java.util.List;

/**
 * 
 * @Title: PaginationResult.java 
 * @Package com.yn.yntp.common.entity.pagination 
 * @Description: 分页结果解 
 *
 * @author liucc    
 * @date 2014年11月21日 下午9:42:31 
 * @version V1.0
 */
public class PaginationResult<T> {
	/*
	 * 初始的每页记录数
	 */
	public final static int DEFAULT_PAGE_SIZE = 10;
	
	/*
	 * 查询返回的最多页数
	 */
	public final static int MAX_PAGENUM = 100;
	
	/*
	 * 查询返回的最多记录数
	 */
	public final static int MAX_ITEMNUM = 5000;

	/*
	 * 总记录数
	 */
	private int totalItemNum;

	/*
	 * 存放当前页的实体列表
	 */
	private List<T> items;
	

	public PaginationResult() {
	}
	
	public PaginationResult(List<T> items) {
		setTotalItemNum(items.size());
		setItems(items);
	}
	
	public PaginationResult(List<T> items, int totalItemNum) {
		setTotalItemNum(totalItemNum);
		setItems(items);
	}
	
	public PaginationResult(List<T> items, int totalItemNum, int pageSize, int startIndex) {
		setTotalItemNum(totalItemNum);
		setItems(items);
	}

	public int getTotalItemNum() {
		return totalItemNum;
	}


	public void setTotalItemNum(int totalItemNum) {
		this.totalItemNum = totalItemNum;
	}

	public List<T> getItems() {
		return items;
	}


	public void setItems(List<T> items) {
		this.items = items;
	}
}
