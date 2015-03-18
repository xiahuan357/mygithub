package com.news.validate;

import java.util.HashMap;
import java.util.Map;

public class FormValidate {
	public String getUsername() {
		return this.username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return this.password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return this.email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getSecemail() {
		return this.secemail;
	}

	public void setSecemail(String ecemail) {
		this.secemail = ecemail;
	}

	public String getIdnum() {
		return this.idnum;
	}

	public void setIdnum(String idnum) {
		this.idnum = idnum;
	}

	public String getSecpassword() {
		return this.secpassword;
	}

	public void setSecpassword(String secpassword) {
		this.secpassword = secpassword;
	}

	private String username;
	private String password;
	private String secpassword;
	private String name;
	private String email;
	private String secemail;
	private String idnum;

	public Map getMsg() {
		return this.msg;
	}

	public void setMsg(Map msg) {
		this.msg = msg;
	}

	private Map msg = new HashMap();

	// ע�����֤
	public boolean validate() {
		boolean bool = true;
		if (this.username == null || this.username.trim().equals("")) {
			bool = false;
			msg.put("username", "�û�����Ϊ�գ�");
		} else {
			if (!this.username.matches("[0-9a-zA-Z]{6,10}")) {
				bool = false;
				msg.put("username", "�û���ӦΪ6-10λ��");
			}
		}
		if (this.password == null || this.password.trim().equals("")) {
			bool = false;
			msg.put("password", "���벻��Ϊ�գ�");
		} else {
			if (!this.password.matches("\\d{6,10}")) {
				bool = false;
				msg.put("password", "����ӦΪ6-10λ��");
			}
		}
		if (this.secpassword == null || this.secpassword.trim().equals("")) {
			bool = false;
			msg.put("secpassword", "ȷ�����벻��Ϊ�գ�");
		} else {
			if (!this.secpassword.equals(this.password)) {
				bool = false;
				msg.put("secpassword", "�����������벻һ�£�");
			}
		}
		if (this.email == null || this.email.trim().equals("")) {
			bool = false;
			msg.put("email", "���䲻��Ϊ�գ�");
		} else {
			if (!this.email.matches("\\w+@\\w+(\\.\\w+)+")) {
				bool = false;
				msg.put("email", "�����ʽ���ԣ�");
			}
		}
		if (this.secemail == null || this.secemail.trim().equals("")) {
			bool = false;
			msg.put("secemail", "ȷ�����䲻��Ϊ�գ�");
		} else {
			if (!this.secemail.equals(this.email)) {
				bool = false;
				msg.put("secemail", "�����������벻һ�£�");
			}
		}
		return bool;
	}

}
