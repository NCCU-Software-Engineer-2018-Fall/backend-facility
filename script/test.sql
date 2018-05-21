select *, c.id as classroom_id from appointment
  inner join classroom c on appointment.classroom_id = c.id
  inner join period p on appointment.period_id = p.id
  inner join users u on appointment.user_id = u.id;

select id, md5((user_id, classroom_id)::TEXT) , user_id, classroom_id, period_id from appointment;

select id, digest(ROW(user_id, classroom_id, period_id, reserved_date)::TEXT, 'sha1') from appointment;


select md5('(2bdc686b-37d6-4f71-80d1-49afd67cfed3,ed5bb09b-b535-4b94-98e0-6be8af4019b1)');


select (user_id, classroom_id) from appointment;
