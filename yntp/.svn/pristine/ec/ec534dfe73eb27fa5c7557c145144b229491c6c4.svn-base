package com.yn.yntp.common.web.vo;

import java.io.Serializable;

/**
 * 
 * @Title: MultiSelectorOptionVO.java 
 * @Package com.yn.yntp.common.web.vo 
 * @Description: 用于下拉框左右选择组件multiselect2side数据传递
 *
 * @author liucc    
 * @date 2014年12月4日 下午3:28:35 
 * @version V1.0
 */
public class MultiSelectorOptionVO implements Serializable,Comparable<MultiSelectorOptionVO>
{
    private Long id;

    private String name;

    private boolean selected;
    
    public MultiSelectorOptionVO(){
    }
    
    public MultiSelectorOptionVO(Long id,String name){
      this.id = id;
      this.name = name;
    }
    
    public Long getId()
    {
        return this.id;
    }

    public void setId(Long id)
    {
        this.id = id;
    }

    public String getName()
    {
        return this.name;
    }

    public void setName(String name)
    {
        this.name = name;
    }

    public boolean isSelected()
    {
        return this.selected;
    }

    public void setSelected(boolean selected)
    {
        this.selected = selected;
    }

    @Override
    public int compareTo(MultiSelectorOptionVO o)
    {
        if(o==null)
            return -1;
       return this.id.compareTo(o.getId());
    }
}