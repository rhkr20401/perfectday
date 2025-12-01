$(function () {
  const $root = $('.location-section');
  if (!$root.length) return;

  const $chips      = $root.find('#chipsTab li');
  const $markers    = $root.find('.map-cate-icon');
  const $bottomBar  = $root.find('.bottom-bar');
  const $placeCard  = $('#placeCard');
  const $placeCardLink = $('#placeCardLink');
  const $placeTag      = $('#placeTag');
  const $placeTitle    = $('#placeTitle');
  const $placeDesc     = $('#placeDesc');
  const $placeAddress  = $('#placeAddress');

  const categoryLabel = {
    food: '맛집',
    cafe: '카페',
    play: '놀거리+',
    all:  '전체'
  };

  $chips.on('click', function () {
    const $chip  = $(this);
    const filter = $chip.data('filter');
    $chip.addClass('active').siblings().removeClass('active');
    $markers.each(function () {
      const $marker  = $(this);
      const category = $marker.data('category');

      if (!filter || filter === 'all' || filter === category) {
        $marker.css('display', 'flex');
      } else {
        $marker.css('display', 'none');
      }
      $marker.removeClass('triangle');
      $marker.find('.marker-label').text('');
    });

    $placeCard.removeClass('show');
    $bottomBar.removeClass('raised');
  });

  $markers.on('click', function (e) {
    e.stopPropagation();

    const $marker  = $(this);
    const isActive = $marker.hasClass('triangle');

    if (isActive) {
      $marker.removeClass('triangle');
      $marker.find('.marker-label').text('');
      $placeCard.removeClass('show');
      $bottomBar.removeClass('raised');
      return;
    }

    $markers.removeClass('triangle');
    $markers.find('.marker-label').text('');
    $marker.addClass('triangle');
    const name = $marker.data('name') || '';
    $marker.find('.marker-label').text(name);

    const cat  = $marker.data('category') || '';
    const desc = $marker.data('desc') || '';
    const addr = $marker.data('address') || '';
    const link = $marker.data('link') || '#';
    $placeTag.text(categoryLabel[cat] || '');
    $placeTitle.text(name);
    $placeDesc.text(desc);
    $placeAddress.text(addr);
    $placeCardLink.attr('href', link);
    $placeCard.addClass('show');
    $bottomBar.addClass('raised');
  });

  $('.location-map').on('click', function (e) {

    if (
      $(e.target).closest(
        '.map-cate-icon, #chipsTab, .place-card, .bottom-bar, header, aside, .trigger, .icon-search'
      ).length
    ){return;}

    $markers.removeClass('triangle');
    $markers.find('.marker-label').text('');
    $placeCard.removeClass('show');
    $bottomBar.removeClass('raised');
  });
});
