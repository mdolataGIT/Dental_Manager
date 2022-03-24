package com.md.dentmanager.web;

import com.md.dentmanager.domain.Tooth;
import com.md.dentmanager.services.MapValidationErrorService;
import com.md.dentmanager.services.ToothService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;

@RestController
@RequestMapping("/api/backlogClient")
@CrossOrigin
public class BacklogController {

    @Autowired
    private ToothService toothService;

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @PostMapping("/{backlogClient_id}")
    public ResponseEntity<?>addTtoBacklog(@Valid @RequestBody Tooth tooth,
                                          BindingResult result, @PathVariable String backlogClient_id, Principal principal){
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if(errorMap != null) return errorMap;

        Tooth tooth1 = toothService.addTooth(backlogClient_id, tooth, principal.getName());

        return new ResponseEntity<Tooth>(tooth1, HttpStatus.CREATED);
    }

    @GetMapping("/{backlogClient_id}")
    public Iterable<Tooth> getClientBacklog(@PathVariable String backlogClient_id, Principal principal){
        return toothService.findBacklogById(backlogClient_id, principal.getName());
    }

    @GetMapping("/{backlogClient_id}/{t_id}")
    public ResponseEntity<?> getTooth(@PathVariable String backlogClient_id, @PathVariable String t_id, Principal principal){
        Tooth tooth = toothService.findTByClientSequence(backlogClient_id, t_id, principal.getName());
        return new ResponseEntity<Tooth>(tooth, HttpStatus.OK);
    }

    @PatchMapping("/{backlogClient_id}/{t_id}")
    public ResponseEntity<?> updateTooth(@Valid @RequestBody Tooth tooth, BindingResult result,
                                               @PathVariable String backlogClient_id, @PathVariable String t_id, Principal principal){
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if(errorMap != null) return errorMap;

        Tooth updatedTask = toothService.updateByClientSequence(tooth, backlogClient_id, t_id, principal.getName());

        return new ResponseEntity<Tooth>(updatedTask, HttpStatus.OK);

    }

    @DeleteMapping("/{backlogClient_id}/{t_id}")
    public ResponseEntity<?> deleteTooth(@PathVariable String backlogClient_id, @PathVariable String t_id, Principal principal){
        toothService.deletePTByClientSequence(backlogClient_id, t_id, principal.getName());

        return new ResponseEntity<String>("Client Task "+t_id+" was declared successfully", HttpStatus.OK);
    }

}
