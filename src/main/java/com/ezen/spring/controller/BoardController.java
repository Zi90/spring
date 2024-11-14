package com.ezen.spring.controller;

import com.ezen.spring.domain.BoardVO;
import com.ezen.spring.domain.PagingVO;
import com.ezen.spring.handler.PagingHandler;
import com.ezen.spring.service.BoardService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@RequestMapping("/board/*")
@RequiredArgsConstructor
@Slf4j
@Controller
public class BoardController {
    private final BoardService bsv;

    @GetMapping("/register")
    public String register(){
        return"/board/register";
    }

    @PostMapping("/register")
    public String register(BoardVO boardVO){
        log.info(">>>> boardVO >>>> {}", boardVO);
        int isOk = bsv.register(boardVO);

        return "index";
    }

    @GetMapping("/list")
    public String list(Model m, PagingVO pgvo){
        // 전체 게시글 수 가져오기
        int totalCount = bsv.getTotalCount(pgvo);
        PagingHandler ph = new PagingHandler(pgvo, totalCount);
        m.addAttribute("list", bsv.getList(pgvo));
        m.addAttribute("ph", ph);
        return"/board/list";
    }

    @GetMapping("/detail")
    public String detail(@RequestParam("bno") long bno, Model m){
        BoardVO bvo = bsv.getDetail(bno);
        m.addAttribute("bvo", bvo);
        return "/board/detail";
    }

    @PostMapping("/modify")
    public String modify(BoardVO bvo, RedirectAttributes redirectAttributes){
        int isOk = bsv.update(bvo);
        redirectAttributes.addAttribute("bno", bvo.getBno());
        return "redirect:/board/detail";
    }

    @GetMapping("/delete")
    public String delete(@RequestParam("bno") long bno){
        int isOk = bsv.delete(bno);
        return "redirect:/board/list";
    }
}
