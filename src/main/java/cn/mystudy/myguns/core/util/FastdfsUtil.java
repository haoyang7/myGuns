package cn.mystudy.myguns.core.util;

import org.csource.common.NameValuePair;
import org.csource.fastdfs.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public class FastdfsUtil {

    private static Logger logger = LoggerFactory.getLogger(FastdfsUtil.class);

    public FastdfsUtil() {

    }

    /**
     * 初始化加载配置文件
     */
    public void init() {
        String configFileName = "src/main/resources/fdfs_client.conf";
        try {
            ClientGlobal.init(configFileName);
        } catch (Exception e) {
            logger.error("加载fdfs配置文件异常", e);
            e.printStackTrace();
        }
    }

    /**
     * 上传文件方法
     *
     * @param file           文件
     * @param uploadFileName 文件名
     * @param fileLength     文件大小
     * @return
     * @throws IOException
     */
    public static String[] uploadFile(MultipartFile file, String uploadFileName, long fileLength) throws IOException {
        String configFileName = "fdfs_client.conf";
        try {
            ClientGlobal.init(configFileName);
        } catch (Exception e) {
            logger.error("加载fdfs配置文件异常", e);
            e.printStackTrace();
        }
        if (file == null) {
            logger.error("上传文件为空");
            return null;
        }
        //得到文件的字节流
        byte[] fileBuff = file.getBytes();
        String fileExtName = "";
        if (uploadFileName.contains(".")) {
            fileExtName = uploadFileName.substring(uploadFileName.lastIndexOf(".") + 1);
        } else {
            logger.error("文件上传失败，因为其文件名格式有问题");
            return null;
        }
        // 建立连接
        TrackerClient tracker = new TrackerClient();
        TrackerServer trackerServer = tracker.getConnection();
        StorageServer storageServer = null;
        StorageClient client = new StorageClient(trackerServer, storageServer);

        // 设置元信息
        NameValuePair[] metaList = new NameValuePair[3];
        metaList[0] = new NameValuePair("fileName", uploadFileName);
        metaList[1] = new NameValuePair("fileExtName", fileExtName);
        metaList[2] = new NameValuePair("fileLength", String.valueOf(fileLength));
        // 上传文件成功后得到返回集合
        String[] files = null;
        try {
            files = client.upload_file(fileBuff, fileExtName, metaList);
        } catch (Exception e) {
            logger.error("--\n" + "Upload File:" + uploadFileName + " Failed,Error:", e);
            return null;
        }
        trackerServer.close();
        return files;
    }

}
