export default function(server) {
  server.createList('education', 2);
  server.createList('experience', 2);

  server.createList('member', 1, {
    experiences: server.createList('experience', 3),
    educations: server.createList('education', 2)
  });
}
