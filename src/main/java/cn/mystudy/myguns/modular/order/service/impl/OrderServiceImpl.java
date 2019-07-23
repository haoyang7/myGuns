package cn.mystudy.myguns.modular.order.service.impl;

import cn.mystudy.myguns.modular.system.model.Order;
import cn.mystudy.myguns.modular.system.dao.OrderMapper;
import cn.mystudy.myguns.modular.order.service.IOrderService;
import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 * 订单表 服务实现类
 * </p>
 *
 * @author yanghao
 * @since 2019-07-22
 */
@Service
public class OrderServiceImpl extends ServiceImpl<OrderMapper, Order> implements IOrderService {

}
