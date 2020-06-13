/**
 * Created by 熊超超 on 2020/6/11.
 */
declare interface JWT {
  secret: string,
  expiresIn: string,
}

declare interface MyResponse<T> {
  data: T
}
