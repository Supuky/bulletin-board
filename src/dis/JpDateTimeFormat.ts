export class JpDateTimeFormat {
  private dateTimeFormat: Intl.DateTimeFormat;

  constructor() {
    this.dateTimeFormat = new Intl.DateTimeFormat('ja-JP', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      weekday: 'short',
      timeZone: 'Asia/Tokyo',
    });
  }

  public formatDate(date?: Date | number) {
    const [
      { value: year },
      ,
      { value: month },
      ,
      { value: day },
      ,
      { value: weekday },
      ,
      { value: hour },
      ,
      { value: minute },
      ,
      { value: second },
    ] = this.dateTimeFormat.formatToParts(date);

    return {
      year,
      month,
      day,
      weekday,
      hour,
      minute,
      second,
    };
  }
}
