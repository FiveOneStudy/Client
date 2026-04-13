import { useState } from 'react'; 
import { PostTableHeader } from '../../components/community/PostTableHeader'; 
import { PostList } from '../../components/community/PostList';
import { UserActionPanel } from '../../components/community/UserActionPanel';

export function Community() { 
  const posts = [ 
    { title: "컴퓨터활용능력 1급", date: "2026.03.30", views: 20 }, 
    { title: "한국사 너무 어려워요", date: "2026.03.30", views: 15 }, 
    { title: "SQL 공부법", date: "2026.03.30", views: 30 }, 
    { title: "컴활 필기 공부", date: "2026.03.30", views: 12 }, 
    { title: "컴활 2급", date: "2026.03.30", views: 9 }, 
    { title: "정보처리기사", date: "2026.03.30", views: 22 }, 
    { title: "토익 공부법", date: "2026.03.30", views: 18 }, 
    { title: "컴퓨터활용능력 1급", date: "2026.03.30", views: 20 }, 
    { title: "한국사 너무 어려워요", date: "2026.03.30", views: 15 }, 
    { title: "SQL 공부법", date: "2026.03.30", views: 30 }, 
    { title: "컴활 필기 공부", date: "2026.03.30", views: 12 }, 
    { title: "컴활 2급", date: "2026.03.30", views: 9 }, 
    { title: "정보처리기사", date: "2026.03.30", views: 22 }, 
    { title: "토익 공부법", date: "2026.03.30", views: 18 }, 
    { title: "컴퓨터활용능력 1급", date: "2026.03.30", views: 20 }, 
    { title: "한국사 너무 어려워요", date: "2026.03.30", views: 15 }
  ];

  return( 
    <div className="min-h-[100%] min-w-[100%] pt-[40px] px-[60px] flex flex-row place-content-between">
      <div className='w-[1040px] flex flex-col gap-[20px]'>
        <div> 
          <div className="w-[1040px] pl-[20px] text-black text-[32px] font-medium">인기순</div> 
          <PostTableHeader /> 
          <PostList posts={posts} items={5}/>
        </div> 

        <div>
        <div className="w-[1040px] pl-[20px] text-black text-[32px] font-medium">최신순</div> 
          <PostTableHeader /> 
          <PostList posts={posts} items={5}/>
        </div>
      </div>

      <UserActionPanel />
    </div>
  ); 
}