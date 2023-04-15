import { useEffect } from "react";
import { FirestoreHelper } from "../utils/firebase"

const Migration = () => {

  // const names = [
  //   "강민지", "이승현", "박지훈", "최영재", "정해인", "강소라", "송중기", "한지민", "윤시윤", "신예은",
  //   "김태희", "장동건", "이민호", "손예진", "이병헌", "한가인", "공유", "김우빈", "서현진", "박해일",
  //   "임시완", "전현무", "김혜수", "조인성", "이정재", "김소현", "유인영", "손호준", "장나라", "이준기",
  //   "임윤아", "조세호", "박민영", "서인국", "김민희", "강하늘", "이시언", "송승헌", "강동원", "진기주",
  //   "류준열", "한예슬", "이동욱", "지창욱", "김하늘", "정려원", "이성민", "김강우", "류승룡", "김민재",
  //   "엄기준", "진세연", "박해진", "서강준", "조여정", "이재인", "고아라", "강예원", "이유비", "박신양",
  //   "박해수", "유진", "이주승", "류한울", "하연수", "정우성", "전지현", "윤계상", "장서희", "김유정",
  //   "남궁민", "임세미", "이기광", "강성훈", "송이재", "장동윤", "서현", "유리", "한혜진", "김지원",
  //   "신성록", "정국", "최민호", "한효주", "박보검", "이종석", "배수지", "박서준", "임윤지", "배두나",
  //   "김민정", "김선아"
  // ];

  //const names = ["김수현",  "이도현",  "홍지민",  "조용우",  "박정민",  "유진호",  "최예진",  "장승훈",  "김태호",  "서민영"];

  // const emails = [
  //   "johndoe@example.com",
  //   "janedoe@example.com",
  //   "bobsmith@example.com",
  //   "sarahjones@example.com",
  //   "davidlee@example.com",
  //   "amandalin@example.com",
  //   "michaelbrown@example.com",
  //   "maryjohnson@example.com",
  //   "williamtaylor@example.com",
  //   "jenniferchen@example.com",
  //   "stevekim@example.com",
  //   "samanthawilson@example.com",
  //   "richardnguyen@example.com",
  //   "emilyzhao@example.com",
  //   "tomjackson@example.com",
  //   "katielee@example.com",
  //   "brandonkim@example.com",
  //   "laurawang@example.com",
  //   "justinchoi@example.com",
  //   "ashleynguyen@example.com",
  //   "jasonhernandez@example.com",
  //   "elizabethpark@example.com",
  //   "andrewlee@example.com",
  //   "michelletran@example.com",
  //   "matthewtan@example.com",
  //   "oliviasmith@example.com",
  //   "danielkim@example.com",
  //   "stephaniechen@example.com",
  //   "ryanlee@example.com",
  //   "angelawong@example.com",
  //   "josephjohnson@example.com",
  //   "gracekim@example.com",
  //   "christophernguyen@example.com",
  //   "hannahli@example.com",
  //   "samuellee@example.com",
  //   "victoriahuang@example.com",
  //   "nicholastan@example.com",
  //   "jasminewang@example.com",
  //   "williamkim@example.com",
  //   "annalee@example.com",
  //   "anthonytran@example.com",
  //   "emilynguyen@example.com",
  //   "josephlee@example.com",
  //   "zoeli@example.com",
  //   "johnsonpham@example.com",
  //   "ellawong@example.com",
  //   "alexandertan@example.com",
  //   "katherinenguyen@example.com",
  //   "jacksonchen@example.com",
  //   "mariakim@example.com",
  //   "davidnguyen@example.com",
  //   "rachelchoi@example.com",
  //   "dereklee@example.com",
  //   "elizabethkim@example.com",
  //   "edwardyang@example.com",
  //   "sophialee@example.com",
  //   "thomasle@example.com",
  //   "catherinelin@example.com",
  //   "joshualim@example.com",
  //   "alisonlee@example.com",
  //   "andrewchoi@example.com",
  //   "dianewang@example.com",
  //   "taylorlee@example.com",
  //   "lucaschen@example.com",
  //   "isabellahuang@example.com",
  //   "seanlee@example.com",
  //   "ashleyliu@example.com",
  //   "danieltan@example.com",
  //   "amelialin@example.com",
  //   "louisewang@example.com",
  //   "bradleykim@example.com",
  //   "kevinnguyen@example.com",
  //   "hannahcho@example.com",
  //   "brandontran@example.com",
  //   "jennylee@example.com",
  //   "lilykim@example.com",
  //   "brandonlee@example.com",
  //   "maddiehuang@example.com",
  //   "jessicaphan@example.com",
  //   "samuelkim@example.com",
  //   "sarahlee@example.com",
  //   "alexandrawang@example.com",
  //   "ethanlee@example.com",
  //   "chloechen@example.com",
  //   "justinkim@example.com",
  //   "megantran@example.com",
  //   "andrewnguyen@example.com",
  // ];

  // const emails = [
  //   "christinachang@example.com",
  //   "jacobrodriguez@example.com",
  //   "nataliemiller@example.com",
  //   "patrickramirez@example.com",
  //   "gracebaker@example.com",
  //   "migueltorres@example.com",
  //   "madisonbell@example.com",
  //   "ethanbrown@example.com",
  //   "sofiaflores@example.com",
  //   "dylanrogers@example.com"
  // ];

  // const contacts = [
  //   "010-1234-5678",
  //   "010-2345-6789",
  //   "010-3456-7890",
  //   "010-4567-8901",
  //   "010-5678-9012",
  //   "010-6789-0123",
  //   "010-7890-1234",
  //   "010-8901-2345",
  //   "010-9012-3456",
  //   "010-0123-4567",
  //   "010-2468-1357",
  //   "010-3691-4825",
  //   "010-4825-3691",
  //   "010-1357-2468",
  //   "010-3579-4682",
  //   "010-4682-3579",
  //   "010-7913-6245",
  //   "010-6245-7913",
  //   "010-9136-2475",
  //   "010-2475-9136",
  //   "010-1369-4825",
  //   "010-4825-1369",
  //   "010-3691-7258",
  //   "010-7258-3691",
  //   "010-9136-5247",
  //   "010-5247-9136",
  //   "010-2468-9135",
  //   "010-9135-2468",
  //   "010-3579-6248",
  //   "010-6248-3579",
  //   "010-4682-5137",
  //   "010-5137-4682",
  //   "010-7913-6248",
  //   "010-6248-7913",
  //   "010-9136-8472",
  //   "010-8472-9136",
  //   "010-1369-4827",
  //   "010-4827-1369",
  //   "010-3691-7259",
  //   "010-7259-3691",
  //   "010-9136-8475",
  //   "010-8475-9136",
  //   "010-2468-9137",
  //   "010-9137-2468",
  //   "010-3579-6249",
  //   "010-6249-3579",
  //   "010-4682-5138",
  //   "010-5138-4682",
  //   "010-7913-6249",
  //   "010-6249-7913",
  //   "010-9136-2478",
  //   "010-2478-9136",
  //   "010-1369-4829",
  //   "010-4829-1369",
  //   "010-3691-7260",
  //   "010-7260-3691",
  //   "010-9136-8478",
  //   "010-8478-9136",
  //   "010-2468-9139",
  //   "010-9139-2468",
  //   "010-3579-6250",
  //   "010-6250-3579",
  //   "010-4682-5139",
  //   "010-5139-4682",
  //   "010-7913-6250",
  //   "010-6250-7913",
  //   "010-9136-2479",
  //   "010-2479-9136",
  //   "010-1369-4830",
  //   "010-4830-1369",
  //   "010-3691-7261",
  //   "010-7261-3691",
  //   "010-9136-8479",
  //   "010-8479-9136",
  //   "010-2468-9140",
  // ];

  // const contacts = ["010-3141-5926",  "010-2718-2818",  "010-1818-8716",  "010-3698-0716",  "010-4221-4006",
  //                   "010-7737-3730",  "010-9442-1912",  "010-1312-6649",  "010-3902-8401",  "010-2987-8724"];

  //const dbUsers = new FirestoreHelper.Users();
  //const dbInstitutes = new FirestoreHelper.Institutes();
  //const dbRegistrations = new FirestoreHelper.Registrations();

  useEffect(() => {
    // const createData = () => {
    //   let data = [];
    //   for (let i=0; i<names.length && i<emails.length && i<contacts.length; i++) {
    //     data.push({
    //       approved: false,
    //       name: names[i],
    //       email: emails[i],
    //       contact: contacts[i],
    //     })
    //   }
    //   return data;
    // }

    // dbUsers.addBatch(createData());

    // dbUsers.deleteWhere([
    //   {expression: 'type', value: '선수'}
    // ]);

    //dbUsers.setRandomWeight();
    //dbRegistrations.registerUsersToTournament('aTPuYXOcm9NqSLHAutNg');
  })

  return (
    <>
      <p>Migration Complete</p>
    </>
  )
}

export { Migration }