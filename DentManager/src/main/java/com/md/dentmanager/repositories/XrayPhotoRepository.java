package com.md.dentmanager.repositories;

import com.md.dentmanager.domain.XrayPhoto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface XrayPhotoRepository extends JpaRepository<XrayPhoto, Long> {
    XrayPhoto findByXrayPhotoId(Long userId); // String? /// LONG
    List<XrayPhoto> findByPeselOrderByXrayPhotoIdDesc(String id);

    @Override
    List<XrayPhoto> findAll();

}
