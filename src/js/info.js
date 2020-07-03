const blockAdd = (namePerson, jobPerson, positionPerson, timeStart, timeFinish) => {
  const table = document.querySelector('.section-table'),
    block = document.createElement('div'),
    name = document.createElement('div'),
    position = document.createElement('div'),
    timeFrom = new Date(timeStart),
    timeTo = new Date(timeFinish),
    startDay = timeFrom.getUTCHours(),
    finishDay = timeTo.getUTCHours();

  block.classList = 'section-table__block';
  block.setAttribute('data-time', 'virtual');

  name.classList = 'section-table__name';
  name.textContent = namePerson;

  position.classList = 'section-table__position';
  position.textContent = `${jobPerson} / ${positionPerson}`;

  block.appendChild(name);
  block.appendChild(position);
  for (let i = 0; i < 24; i++) {
    const time = document.createElement('div');
    time.classList = 'section-table__time';
    if (startDay !== '' && finishDay !== '' && i >= startDay && i < finishDay) {
      time.classList.add('active');
    }
    block.appendChild(time);
  }
  table.appendChild(block);

};

const infoAdd = (virtual) => {
  virtual.map(item => blockAdd.apply(this, item));
};

const addClass = (block, timeStart, timeFinish, classDel, classAdd) => {
  const dayTime = block.querySelectorAll('.section-table__time'),
    timeFrom = new Date(timeStart),
    timeTo = new Date(timeFinish);
  let startDay = timeFrom.getUTCHours(),
    finishDay = timeTo.getUTCHours();

  if (finishDay <= startDay) {
    finishDay = 24;
  };

  dayTime.forEach((item, i) => {
    item.classList.remove(classDel);
    if (startDay !== '' && finishDay !== '' && i >= startDay && i < finishDay) {
      item.classList.add(classAdd);
    }
  });

};

const infoTime = (virtual, actual) => {

  const blockPerson = document.querySelectorAll('.section-table__block');

  blockPerson.forEach((item, index) => {
    item.setAttribute('data-index', index);
    item.addEventListener('click', (e) => {
      const target = e.target,
        block = target.closest('.section-table__block'),
        blockIndex = block.dataset.index,
        blockTime = block.dataset.time;

      if (blockTime === 'virtual') {
        block.dataset.time = 'actual';
        addClass(block, actual[blockIndex][3], actual[blockIndex][4], 'active', 'done');
      } else {
        block.dataset.time = 'virtual';
        addClass(block, virtual[blockIndex][3], virtual[blockIndex][4], 'done', 'active');
      }
    });
  }
  );
};

const info = () => {
  fetch('./staff.json')
    .then((response) => {
      if (response.status !== 200) {
        throw error;
      }
      return (response.json());
    })
    .then((response) => {
      const virtual = response.virtual;
      const actual = response.actual;
      infoAdd(virtual);
      infoTime(virtual, actual);
    })
    .catch(() => console.error('error'));
};

export default info;