package com.yn.yntp.common.persistence.search;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import org.apache.commons.lang3.tuple.ImmutableTriple;
import org.apache.commons.lang3.tuple.Triple;

import com.google.common.base.Preconditions;
import com.google.common.collect.Lists;
import com.yn.yntp.common.entity.search.ClientOperation;
import com.yn.yntp.common.entity.search.QueryConstants;

/**
 * 
 * @Title: SearchCommonUtil.java 
 * @Package com.yn.yntp.common.persistence.search 
 * @Description: 搜索工具类。
 *
 * @author liucc    
 * @date 2014年11月21日 下午9:44:34 
 * @version V1.0
 */
public final class SearchCommonUtil {

	private SearchCommonUtil() {
		throw new UnsupportedOperationException();
	}

	// API

	public static List<Triple<String, ClientOperation, String>> parseQueryString(
			String queryString) {
		if(null == queryString || queryString.isEmpty())
			return null;
		
		//过滤单引号特殊字符
		queryString = queryString.replace("'","''"); 
		
		// Preconditions.checkNotNull(queryString);
		// Preconditions.checkState(queryString
		// .matches("((id~?=[0-9]+)?,?)*((name~?=[0-9a-zA-Z\\-_/*]+),?)*"));

		final List<Triple<String, ClientOperation, String>> tuplesList = Lists
				.newArrayList();
		final String[] tuples = queryString.split(QueryConstants.SEPARATOR);
		for (final String tuple : tuples) {
			String oper = QueryConstants.OP_LE;
			String[] keyAndValue = tuple.split(oper);
			if (keyAndValue.length != 2) {
				oper = QueryConstants.OP_LT;
				keyAndValue = tuple.split(oper);
			}
			if (keyAndValue.length != 2) {
				oper = QueryConstants.OP_GE;
				keyAndValue = tuple.split(oper);
			}
			if (keyAndValue.length != 2) {
				oper = QueryConstants.OP_GT;
				keyAndValue = tuple.split(oper);
			}
			if (keyAndValue.length != 2) {
				oper = QueryConstants.OP_IN;
				keyAndValue = tuple.split("\\[\\]=");
			}
			if (keyAndValue.length != 2) {
				oper = QueryConstants.OP_EQ;
				keyAndValue = tuple.split(oper);
			}
			Preconditions.checkState(keyAndValue.length == 2);
			tuplesList.add(createConstraintFromUriParam(keyAndValue[0],
					keyAndValue[1], oper));
		}

		return tuplesList;
	}

	// public static List<ImmutableTriple<String, ClientOperation, ?>>
	// uriParamsToConstraints(
	// final Map<String, String[]> validParameters) {
	// final List<ImmutableTriple<String, ClientOperation, ?>> tuplesList =
	// Lists.newArrayList();
	// for (final Map.Entry<String, String[]> mapKeyValue : validParameters
	// .entrySet()) {
	// tuplesList.add(createConstraintFromUriParam(mapKeyValue.getKey(),
	// mapKeyValue.getValue()[0]));
	// }
	// return tuplesList;
	// }

	public static boolean validateParameters(final Set<String> paramKeys) {
		return true;
	}

	// util

	static ImmutableTriple<String, ClientOperation, String> createConstraintFromUriParam(
			final String key, final String value, final String oper) {
		boolean negated = false;
		if (key.endsWith(QueryConstants.NEGATION)) {
			negated = true;
		}

		final ClientOperation op = determineOperation(negated, oper, value);
		final String theKey = determineKey(negated, key);
		final String theValue = determineValue(value);
		return new ImmutableTriple<String, ClientOperation, String>(theKey, op,
				theValue);
	}

	static String determineValue(final String value) {
		return value.replaceAll("\\*", QueryConstants.ANY_SERVER);
	}

	static String determineKey(final boolean negated, final String key) {
		if (negated) {
			return key.substring(0, key.length() - 1);
		}
		return key;
	}

	static ClientOperation determineOperation(final boolean negated,
			final String oper, final String value) {
		ClientOperation op = null;
		if (oper.equals(QueryConstants.OP_EQ)) {
			if (value.startsWith(QueryConstants.ANY_CLIENT)) {
				if (value.endsWith(QueryConstants.ANY_CLIENT)) {
					op = negated ? ClientOperation.NEG_CONTAINS
							: ClientOperation.CONTAINS;
				} else {
					op = negated ? ClientOperation.NEG_ENDS_WITH
							: ClientOperation.ENDS_WITH;
				}
			} else if (value.endsWith(QueryConstants.ANY_CLIENT)) {
				op = negated ? ClientOperation.NEG_STARTS_WITH
						: ClientOperation.STARTS_WITH;
			} else {
				op = negated ? ClientOperation.NEG_EQ : ClientOperation.EQ;
			}
		} else if (oper.equals(QueryConstants.OP_LT)) {
			op = ClientOperation.LT;
		} else if (oper.equals(QueryConstants.OP_LE)) {
			op = ClientOperation.LE;
		} else if (oper.equals(QueryConstants.OP_GT)) {
			op = ClientOperation.GT;
		} else if (oper.equals(QueryConstants.OP_GE)) {
			op = ClientOperation.GE;
		} else if (oper.equals(QueryConstants.OP_IN)) {
			op = negated ? ClientOperation.NEG_IN : ClientOperation.IN;
		}

		return op;
	}

	public static List<Long> parseId(String queryString){
		return parseId(parseQueryString(queryString));
	}
	
	static List<Long> parseId(List<Triple<String, ClientOperation, String>> parsedQuery){
		List<Long> ids = new ArrayList<Long>();
		if(null != parsedQuery && parsedQuery.size() == 1){
			Triple<String, ClientOperation, String> triple = parsedQuery.get(0);
			if(triple.getLeft().equals(QueryConstants.ID)){
				
				if(triple.getMiddle().equals(ClientOperation.IN)){
					String[] arrId = triple.getLeft().split(",");
					for(int i = 0; i < arrId.length; i++){
						try{
							Long id = Long.parseLong(arrId[i]);
							ids.add(id);
						}catch(NumberFormatException e){
							throw new IllegalStateException();
						}
					}
				}else if(triple.getMiddle().equals(ClientOperation.EQ)){
					try{
					Long id = Long.parseLong(triple.getLeft());
					ids.add(id);
				}catch(NumberFormatException e){
					throw new IllegalStateException();
				}
				}else{
					throw new IllegalStateException();
				}
			}else{
				throw new IllegalStateException();
			}
		}
		return ids;
	}
	
}
