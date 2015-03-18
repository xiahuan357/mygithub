package junit.test;

import org.junit.Test;

import com.news.dao.NewsDAOImpl;
import com.news.dao.UserDAO;
import com.news.entity.NewsEntity;
import com.news.entity.UserEntity;

public class NewsDAOTest {
	@Test
	public void testaddtype() {
		UserEntity user = new UserEntity();
//		user.setType("�û�");
//		user.setId("2");
//		user.setName("xxx");
		user.setUsername("xiahtic");
		user.setPassword("111111");
//		UserDAO dao = new UserDAO1Impl();
//		dao.creat(user);
	}
}
