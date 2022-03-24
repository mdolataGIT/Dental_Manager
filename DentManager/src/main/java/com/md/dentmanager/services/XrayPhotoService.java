package com.md.dentmanager.services;
import com.md.dentmanager.bucket.BucketName;
import com.md.dentmanager.domain.Client;
import com.md.dentmanager.domain.XrayPhoto;
import com.md.dentmanager.exceptions.ClientNotFoundException;
import com.md.dentmanager.exceptions.XrayPhotoIdException;
import com.md.dentmanager.filestore.FileStore;
import com.md.dentmanager.repositories.ClientRepository;
import com.md.dentmanager.repositories.XrayPhotoRepository;
import org.apache.http.entity.ContentType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

@Service
public class XrayPhotoService {

    private final FileStore fileStore;

    @Autowired
    private XrayPhotoRepository xrayPhotoRepository;

    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    public XrayPhotoService(XrayPhotoRepository xrayPhotoRepository, FileStore fileStore){
        this.xrayPhotoRepository = xrayPhotoRepository;
        this.fileStore = fileStore;
    }

    public void uploadXrayPhotoImage(Long xrayPhotoId, MultipartFile file) {
        isFileEmpty(file);
        isImage(file);
        // user exist in database
        XrayPhoto xrayPhoto = getXrayPhotoOrThrow(xrayPhotoId);
        //grab some metadata from file if any
        Map<String, String> metadata = extractMetadata(file);
        //store the image in s3 and update database (userProfileImageLink) with s3 image link
        String path = String.format("%s/%s", BucketName.XRAY_IMAGE.getBucketName(), xrayPhoto.getXrayPhotoId());
        String filename = String.format("%s-%s", file.getOriginalFilename(), UUID.randomUUID());

        try {
            fileStore.save(path, filename, Optional.of(metadata), file.getInputStream());
            xrayPhoto.setXrayPhotoLink(filename);
            xrayPhotoRepository.save(xrayPhoto); //!!!
        } catch (IOException e){
            throw new IllegalStateException(e);
        }
    }


    public byte[] downloadXrayPhotoImage(Long xrayPhotoId) {
        XrayPhoto xrayPhoto = getXrayPhotoOrThrow(xrayPhotoId);

        String path = String.format("%s/%s",
                BucketName.XRAY_IMAGE.getBucketName(),
                xrayPhoto.getXrayPhotoId());

        return xrayPhoto.getXrayPhotoLink()
                .map(key -> fileStore.download(path, key))
                .orElse(new byte[0]);

    }


    private Map<String, String> extractMetadata(MultipartFile file) {
        Map<String, String> metadata = new HashMap<>();
        metadata.put("Content-Type", file. getContentType());
        metadata.put("Content-Length", String.valueOf(file.getSize()));
        return metadata;
    }

    private XrayPhoto getXrayPhotoOrThrow(Long xrayPhotoId) {
        return xrayPhotoRepository //userProfileDataAccessService
                // .getUserProfiles()
                .findAll()
                .stream()
                .filter(xrayPhoto -> xrayPhoto.getXrayPhotoId().equals(xrayPhotoId))
                .findFirst()
                .orElseThrow(() -> new IllegalStateException(String.format("User profile %s not found", xrayPhotoId)));
    }

    private void isImage(MultipartFile file) {
        if(!Arrays.asList(ContentType.IMAGE_JPEG.getMimeType(), ContentType.IMAGE_PNG.getMimeType(), ContentType.IMAGE_GIF.getMimeType()).contains(file.getContentType())){
            throw new IllegalStateException("File must be an image ["+ file.getContentType()+ "]");
        }
    }

    private void isFileEmpty(MultipartFile file) {
        if(file.isEmpty()){
            throw new IllegalStateException("Cannot upload empty file ["+ file.getSize() + "]");
        }
    }

    public XrayPhoto saveOrUpdateXrayPhoto(String pesel, XrayPhoto xrayPhoto) {
        try{
            Client client = clientRepository.findByPesel(pesel);
            xrayPhoto.setClient(client);
            // xrayPhoto.setXrayPhotoId(xrayPhoto.getXrayPhotoId());
            xrayPhoto.setPesel(pesel);
            return xrayPhotoRepository.save(xrayPhoto);
        }catch (Exception e){
            throw new XrayPhotoIdException("Project ID '"+ xrayPhoto.getXrayPhotoId()+"' already exists");
        }

    }

    public Iterable<XrayPhoto> findXrayPhotoByClientId(String id) {
        Client client = clientRepository.findByPesel(id);
        if(client ==null){
            throw new ClientNotFoundException("Client with ID: '"+id+"' does not exist");
        }
        return xrayPhotoRepository.findByPeselOrderByXrayPhotoIdDesc(id);
    }
}
