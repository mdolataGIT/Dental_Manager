package com.md.dentmanager.web;

import com.md.dentmanager.domain.XrayPhoto;
import com.md.dentmanager.services.MapValidationErrorService;
import com.md.dentmanager.services.XrayPhotoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("api/xray-photo")
@CrossOrigin("*")
public class XrayPhotoController {

    private final XrayPhotoService xrayPhotoService;

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @Autowired
    public XrayPhotoController(XrayPhotoService xrayPhotoService) {
        this.xrayPhotoService = xrayPhotoService;
    }

    @PostMapping("/{client_id}") // post
    public ResponseEntity<?> createNewXrayPhoto(@Valid @RequestBody XrayPhoto xrayPhoto,
                                                BindingResult result, @PathVariable String client_id) {

        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap != null) return errorMap;

        XrayPhoto xrayPhoto1 = xrayPhotoService.saveOrUpdateXrayPhoto(client_id, xrayPhoto);

        return new ResponseEntity<XrayPhoto>(xrayPhoto1, HttpStatus.CREATED);
    }

    @GetMapping("/{client_id}") // get all
    public Iterable<XrayPhoto> getXrayPhotos(@PathVariable String client_id) {
        return xrayPhotoService.findXrayPhotoByClientId(client_id);
    }

    @PostMapping(
            path = "{xrayPhotoId}/image/upload",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE,
            produces = MediaType.APPLICATION_PROBLEM_JSON_VALUE

    )
    public void uploadXrayPhotoImage(@PathVariable("xrayPhotoId") Long xrayPhotoId, @RequestParam("file") MultipartFile file) {
        //@ModelAttribute("userProfile") XrayPhoto userProfile,
        xrayPhotoService.uploadXrayPhotoImage(xrayPhotoId, file);
        // userProfileService.saveUserProfile(userProfile);
    }

    @GetMapping("{xrayPhotoId}/image/download")
    public byte[] downloadXrayPhotoImage(@PathVariable("xrayPhotoId") Long xrayPhotoId) {
        return xrayPhotoService.downloadXrayPhotoImage(xrayPhotoId);
    }
}
