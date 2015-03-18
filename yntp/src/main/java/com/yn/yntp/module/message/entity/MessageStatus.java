package com.yn.yntp.module.message.entity;

public enum MessageStatus {

  /**
   * 在收件箱,365天后状态改成垃圾箱
   */
  IN_BOX(0, "收件箱"),
  /**
   * 在发件箱,365天后状态改成垃圾箱
   */
  OUT_BOX(1, "发件箱"),
  /**
   * 在收藏箱,不允许删除
   */
  STORE_BOX(2, "收藏箱"),
  /**
   * 在垃圾箱,30天后状态改成已删除
   */
  TRASH_BOX(3, "垃圾箱"),
  /**
   * 在草稿箱,永久不删除
   */
  DRAFT_BOX(4, "草稿箱"),
  /**
   * 邮件删除了，只有收件人和发件人都删除了，才能真正删除
   */
  DELETE_BOX(5, "已删除");

  private final Integer code;
  private final String name;

  private MessageStatus(Integer code, String name) {
    this.code = code;
    this.name = name;
  }

  public String getName() {
    return name;
  }
}
