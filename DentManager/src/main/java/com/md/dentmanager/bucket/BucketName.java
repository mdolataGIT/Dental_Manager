package com.md.dentmanager.bucket;

public enum BucketName {

    XRAY_IMAGE("SECURED");

    private final String bucketName;


    BucketName(String bucketName) {
        this.bucketName = bucketName;
    }

    public String getBucketName() {
        return bucketName;
    }
}
